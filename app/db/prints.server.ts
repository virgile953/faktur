import { db } from "./schema.server";
import { print } from "~/types/Print";

// Get all prints
export function getAllPrints(): print[] {
	const rawPrints = db
		.prepare(
			`
				SELECT * FROM prints
				WHERE archived = 0
				ORDER BY date DESC
				`
		)
		.all() as any[];

	// Parse JSON fields back to arrays
	const prints = rawPrints.map(print => ({
		...print,
		filamentsUsed: JSON.parse(print.filamentsUsed),
		filamentsQuantity: JSON.parse(print.filamentsQuantity),
		usedUpgrades: JSON.parse(print.usedUpgrades),
		usedConsumables: JSON.parse(print.usedConsumables)
	})) as print[];

	return prints;
}

// Get a single print by ID
export function getPrintById(id: number): print | null {
	const rawPrint = db
		.prepare(
			`
				SELECT * FROM prints WHERE id = ?
				`
		)
		.get(id) as any | undefined;

	if (!rawPrint) return null;

	// Parse JSON fields back to arrays
	const print = {
		...rawPrint,
		filamentsUsed: JSON.parse(rawPrint.filamentsUsed),
		filamentsQuantity: JSON.parse(rawPrint.filamentsQuantity),
		usedUpgrades: JSON.parse(rawPrint.usedUpgrades),
		usedConsumables: JSON.parse(rawPrint.usedConsumables)
	} as print;

	return print;
}

// Create a new print
export function createPrint(print: print): print {
	const insertPrintReq = db.prepare(`
			INSERT INTO prints (name, date, printerUsed, filamentsUsed, clientId, filamentsQuantity, timeToPrint, file, image, usedUpgrades, usedConsumables)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

	const result = insertPrintReq.run(
		print.name,
		print.date,
		print.printerUsed,
		JSON.stringify(print.filamentsUsed),
		print.clientId,
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
		SET name = ?, date = ?, printerUsed = ?, filamentsUsed = ?, client = ?, filamentsQuantity = ?, timeToPrint = ?, file = ?, image = ?, usedUpgrades = ?, usedConsumables = ?
		WHERE id = ?
		`);

	updatePrintReq.run(
		print.name,
		print.date,
		print.printerUsed,
		JSON.stringify(print.filamentsUsed),
		print.clientId,
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
