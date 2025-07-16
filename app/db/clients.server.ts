import { Client } from "~/types/Client";
import { db } from "./schema.server";
import { getAllPrints } from "./prints.server";

// Get all printers with their relationships
export function getClients(): Client[] {
	const clients = db
		.prepare(`SELECT * FROM clients ORDER BY id;`)
		.all() as Client[];
	const prints = getAllPrints();

	return clients.map((client) => ({
		...client,
		prints: prints.filter((print) => print.clientId === client.id),
	}));
}
export function getClientById(id: number): Client | null {
	const client = db.prepare(`SELECT * FROM clients WHERE id = ?`).get(id) as
		| Client
		| undefined;

	if (!client) return null;

	return client;
}

export function updateClient(client: Client): number {
	const nb = db
		.prepare(
			`update clients set name = ?, email = ?, phone = ?, address = ?
		WHERE id = ?`
		)
		.run(
			client.name,
			client.email,
			client.phone,
			client.address,
			client.id
		).changes;
	return nb;
}

export function deleteClient(id: number): boolean {
	const result = db
		.prepare(`UPDATE clients SET archived = 1 WHERE id = ?`)
		.run(id);
	return result.changes > 0;
}

// return void, inshallah it creates it properly
export function createClient(client: Client): void {
	const req = db
		.prepare(
			`insert into clients (name, email, phone, address)
		values (?, ?, ?, ?);`
		)
		.run(client.name, client.email, client.phone, client.address);
}

export function updateClients(clients: Client[]) {
	const deleteReq = db.prepare("delete from clients").run();
	let nb = 0;
	clients.map((client) => {
		console.log(client);
		createClient(client);
		nb++;
	});

	return nb;
}
