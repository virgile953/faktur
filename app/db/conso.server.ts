import { Conso, ConsoFull } from "~/types/conso";
import { db } from "./schema.server";
import { Consumable, Printer, Upgrade } from "~/types/Printer";
import { getPrintById } from "./prints.server";
import { getPrinterById } from "./printers.server";

// Get all printers with their relationships
export function getAllConso(): Conso[] {
	const consos = db
		.prepare(`SELECT * FROM conso ORDER BY id;`)
		.all() as Conso[];

	return consos;
}

export function getFullConsos(): ConsoFull[] {
	const consos = db
		.prepare(`select id, printerId, filamentType, consoKw from conso`)
		.all() as Conso[];

	const ret = consos.map((conso) => {
		const consoFull: ConsoFull = {
			consoKw: conso.consoKw,
			printer: getPrinterById(conso.printerId)!,
			filamentType: conso.filamentType,
			id: conso.id,
		};
		return consoFull;
	});

	return ret;
}

export function updateConso(conso: Conso): number {
	const nb = db
		.prepare(
			`update conso set printerId = ?, consoKw = ?, filamentType = ? 
		WHERE id = ?`
		)
		.run(conso.printerId, conso.consoKw, conso.filamentType).changes;
	return nb;
}

export function deleteConso(id: number): boolean {
	const result = db.prepare(`DELETE FROM conso WHERE id = ?`).run(id);
	return result.changes > 0;
}

export function getElecPrice(): number {
	return (
		db.prepare(`SELECT elecPrice FROM config LIMIT 1`).get() as {
			elecPrice: number;
		}
	).elecPrice;
}

// return void, inshallah it creates it properly
export function createConso(conso: Conso): void {
	const req = db
		.prepare(
			`insert into conso (printerId, consoKw, filamentType)
		values (?, ?, ?);`
		)
		.run(conso.printerId, conso.consoKw, conso.filamentType);
}

export function updateConsos(consos: Conso[]) {
	const deleteReq = db.prepare("delete from conso").run();
	let nb = 0;
	consos.map((conso) => {
		console.log(conso);
		createConso(conso);
		nb++;
	});

	return nb;
}

export function updateElecPrice(price: number): boolean {
	const result = db.prepare(`UPDATE config SET elecPrice  = ?;`).run(price);
	return result.changes > 0;
}
