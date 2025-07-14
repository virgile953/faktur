import { db } from "./schema.server";
import { print } from "~/types/Print";

// Get all prints
export function getAllPrints(): print[] {
	const prints = db
		.prepare(
			`
				SELECT * FROM prints
				WHERE archived = 0
				ORDER BY date DESC
				`
		)
		.all() as print[];

	return prints;
}

// Get a single print by ID
export function getPrintById(id: number): print | null {
	const print = db
		.prepare(
			`
				SELECT * FROM prints WHERE id = ?
				`
		)
		.get(id) as print | undefined;

	return print || null;
}

// Create a new print
export function createPrint(print: print): print {
	const insertPrintReq = db.prepare(`
			INSERT INTO prints (name, date, printerUsed, filamentsUsed, client, filamentQuantity, timeToPrint, file, image, usedUpgrades, usedConsumables)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

	const result = insertPrintReq.run(
		print.name,
		print.date,
		print.printerUsed,
		JSON.stringify(print.filamentsUsed),
		print.client,
		JSON.stringify(print.filamentsQuantity),
		print.timeToPrint,
		print.file,
		print.image,
		JSON.stringify(print.usedUpgrades),
		JSON.stringify(print.usedConsumables)
	);

	const newPrintId = result.lastInsertRowid as number;

	return getPrintById(newPrintId)!;
}

// Update an existing print
export function updatePrint(print: print): print | null {
	const { id } = print;
	if (!id) return null;

	const updatePrintReq = db.prepare(`
		UPDATE prints
		SET name = ?, date = ?, printerUsed = ?, filamentsUsed = ?, client = ?, filamentQuantity = ?, timeToPrint = ?, file = ?, image = ?, usedUpgrades = ?, usedConsumables = ?
		WHERE id = ?
		`);

	updatePrintReq.run(
		print.name,
		print.date,
		print.printerUsed,
		JSON.stringify(print.filamentsUsed),
		print.client,
		JSON.stringify(print.filamentsQuantity),
		print.timeToPrint,
		print.file,
		print.image,
		JSON.stringify(print.usedUpgrades),
		JSON.stringify(print.usedConsumables),
		id
	);

	return getPrintById(id);
}

// Delete a print (soft delete by setting archived = 1)
export function deletePrint(id: number): boolean {
	const result = db
		.prepare(`UPDATE prints SET archived = 1 WHERE id = ?`)
		.run(id);

	return result.changes > 0;
}
