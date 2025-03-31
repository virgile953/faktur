import { db } from "./schema.server";
import { Consumable, Printer, Upgrade } from "~/types/Printer";

// Get all printers with their relationships
export function getAllPrinters(): Printer[] {
	const printers = db
		.prepare(
			`
		SELECT * FROM printers
		WHERE archived = 0
		ORDER BY name
	`
		)
		.all() as Omit<Printer, "upgrades" | "consumables">[];

	// For each printer, get its upgrades and consumables
	return printers.map((printer) => {
		const upgrades = db
			.prepare(
				`
			SELECT id, name, price, installDate FROM upgrades
			WHERE printerId = ?
		`
			)
			.all(printer.id) as Upgrade[];

		const consumables = db
			.prepare(
				`
			SELECT id, name, lifeTime, usedTime, price FROM consumables
			WHERE printerId = ?
		`
			)
			.all(printer.id) as Consumable[];

		return {
			...printer,
			upgrades,
			consumables,
		};
	});
}

// Get a single printer by ID with all its relationships
export function getPrinterById(id: number): Printer | null {
	const printer = db
		.prepare(
			`
		SELECT * FROM printers WHERE id = ?
	`
		)
		.get(id) as Omit<Printer, "upgrades" | "consumables"> | undefined;

	if (!printer) return null;

	const upgrades = db
		.prepare(
			`
		SELECT id, name, price, installDate FROM upgrades
		WHERE printerId = ?
	`
		)
		.all(printer.id) as Upgrade[];

	const consumables = db
		.prepare(
			`
		SELECT id, name, lifeTime, usedTime, price FROM consumables
		WHERE printerId = ?
	`
		)
		.all(printer.id) as Consumable[];

	return {
		...printer,
		upgrades,
		consumables,
	};
}

// Create a new printer with its relationships
export function createPrinter(printer: Printer): Printer {
	const insertPrinter = db.prepare(`
		INSERT INTO printers (name, image, price, consumption)
		VALUES (?, ?, ?, ?)
	`);

	const insertUpgrade = db.prepare(`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`);

	const insertConsumable = db.prepare(`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`);

	// Use a transaction to ensure all data is inserted properly
	const result = db.transaction(() => {
		const info = insertPrinter.run(
			printer.name,
			printer.image,
			printer.price,
			printer.consumption
		);

		const newPrinterId = info.lastInsertRowid as number;

		// Insert all upgrades
		for (const upgrade of printer.upgrades) {
			insertUpgrade.run(
				upgrade.name,
				upgrade.price,
				upgrade.installDate,
				newPrinterId
			);
		}

		// Insert all consumables
		for (const consumable of printer.consumables) {
			insertConsumable.run(
				consumable.name,
				consumable.lifeTime,
				consumable.usedTime,
				consumable.price,
				newPrinterId
			);
		}

		return newPrinterId;
	})();

	// Return the newly created printer
	return getPrinterById(result as number)!;
}

// Update an existing printer and its relationships
export function updatePrinter(printer: Printer): Printer | null {
	const { id } = printer;
	if (!id) return null;

	const updatePrinterStmt = db.prepare(`
		UPDATE printers
		SET name = ?, image = ?, price = ?, consumption = ?
		WHERE id = ?
	`);

	// Delete existing relationships to replace them
	const deleteUpgrades = db.prepare(`DELETE FROM upgrades WHERE printerId = ?`);
	const deleteConsumables = db.prepare(
		`DELETE FROM consumables WHERE printerId = ?`
	);

	const insertUpgrade = db.prepare(`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`);

	const insertConsumable = db.prepare(`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`);

	// Use a transaction for the update process
	db.transaction(() => {
		updatePrinterStmt.run(
			printer.name,
			printer.image,
			printer.price,
			printer.consumption,
			id
		);

		// Replace relationships
		deleteUpgrades.run(id);
		deleteConsumables.run(id);

		// Insert all upgrades
		for (const upgrade of printer.upgrades) {
			insertUpgrade.run(upgrade.name, upgrade.price, upgrade.installDate, id);
		}

		// Insert all consumables
		for (const consumable of printer.consumables) {
			insertConsumable.run(
				consumable.name,
				consumable.lifeTime,
				consumable.usedTime,
				consumable.price,
				id
			);
		}
	})();

	return getPrinterById(id);
}

// Delete a printer (will cascade delete related upgrades and consumables)
export function deletePrinter(id: number): boolean {
	// const result = db.prepare(`DELETE FROM printers WHERE id = ?`).run(id);
	const result = db
		.prepare(`UPDATE printers SET archived = 1 WHERE id = ?`)
		.run(id);
	return result.changes > 0;
}

// Add an upgrade to a printer
export function addUpgradeToPrinter(
	printerId: number,
	upgrade: Omit<Upgrade, "id">
): boolean {
	const result = db
		.prepare(
			`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`
		)
		.run(upgrade.name, upgrade.price, upgrade.installDate, printerId);

	return result.lastInsertRowid !== null;
}

// Add a consumable to a printer
export function addConsumableToPrinter(
	printerId: number,
	consumable: Omit<Consumable, "id">
): boolean {
	const result = db
		.prepare(
			`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`
		)
		.run(
			consumable.name,
			consumable.lifeTime,
			consumable.usedTime,
			consumable.price,
			printerId
		);

	return result.lastInsertRowid !== null;
}

// Delete an upgrade
export function deleteUpgrade(id: number): boolean {
	// const result = db.prepare(`DELETE FROM upgrades WHERE id = ?`).run(id);
	const result = db
		.prepare(`UPDATE upgrades SET archived = 1 WHERE id = ?`)
		.run(id);
	return result.changes > 0;
}

// Delete a consumable
export function deleteConsumable(id: number): boolean {
	// const result = db.prepare(`DELETE FROM consumables WHERE id = ?`).run(id);
	const result = db
		.prepare(`UPDATE consumables SET archived = 1 WHERE id = ?`)
		.run(id);
	return result.changes > 0;
}

// Update a consumable's used time
export function updateConsumableUsedTime(
	id: number,
	usedTime: number
): boolean {
	const result = db
		.prepare(
			`
		UPDATE consumables SET usedTime = ? WHERE id = ?
	`
		)
		.run(usedTime, id);

	return result.changes > 0;
}
