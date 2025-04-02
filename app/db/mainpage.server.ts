import { db } from "./schema.server";
import { Consumable, Printer, Upgrade } from "~/types/Printer";
import { MainPagePrinters, MainPageFilaments } from "~/types/MainPage";
import { getFilamentById } from "./filaments.server";

export function getPrintersUsage(): MainPagePrinters[] {
	let returnElems: MainPagePrinters[] = [];
	const printersStats = db
		.prepare(
			`
			SELECT
				printerUsed,
				max(date) as lastPrint,
				count(id) as nbPrints
			FROM
				prints
			GROUP BY
				printerUsed
			ORDER BY
				nbPrints desc,
				lastPrint desc;
			`
		)
		.all() as { lastPrint: string; nbPrints: number; printerUsed: number }[];

	printersStats.map((printer) => {
		returnElems.push({
			lastPrintDate: printer.lastPrint,
			nbPrints: printer.nbPrints,
			printer: getPrinterById(printer.printerUsed)!,
		});
	});

	return returnElems;
}

export function getFilamentsUsage(): MainPageFilaments[] {
	let returnElems: MainPageFilaments[] = [];
	const filamentsStats = db
		.prepare(
			`
			SELECT 
				json_each.value AS filamentId,
				COUNT(*) AS nbPrints,
				MAX(date) as lastPrint
			FROM
				prints,
				json_each(prints.filamentsUsed)
			GROUP BY
				filamentId
			ORDER BY
				nbPrints DESC;

			`
		)
		.all() as { lastPrint: string; nbPrints: number; filamentId: number }[];

	filamentsStats.map((printer) => {
		returnElems.push({
			lastPrintDate: printer.lastPrint,
			nbPrints: printer.nbPrints,
			filament: getFilamentById(printer.filamentId)!,
		});
	});
	
	return returnElems;
}

function getPrinterById(id: number): Printer | null {
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
