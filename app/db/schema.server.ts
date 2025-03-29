import { Database } from "better-sqlite3";
import sqlite from "better-sqlite3";
import { Consumable, Printer, Upgrade } from "~/types/Printer";

let db: Database;

declare global {
	var __db: Database | undefined;
}

// This ensures we don't create multiple db connections during development
if (process.env.NODE_ENV === "production") {
	db = new sqlite("faktur.db");
} else {
	if (!global.__db) {
		global.__db = new sqlite("faktur.db");
	}
	db = global.__db;
}

// Create tables if they don't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS printers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		image TEXT NOT NULL,
		price REAL NOT NULL,
		consumption REAL NOT NULL
	);

	CREATE TABLE IF NOT EXISTS upgrades (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		price REAL NOT NULL,
		installDate TEXT NOT NULL,
		printerId INTEGER NOT NULL,
		FOREIGN KEY (printerId) REFERENCES printers(id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS consumables (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		lifeTime INTEGER NOT NULL,
		usedTime INTEGER NOT NULL,
		price REAL NOT NULL,
		printerId INTEGER NOT NULL,
		FOREIGN KEY (printerId) REFERENCES printers(id) ON DELETE CASCADE
	);
`);

// Seed the database with initial data if it's empty
const printerCount = db
	.prepare("SELECT COUNT(*) as count FROM printers")
	.get() as { count: number };

if (printerCount.count === 0) {
	// Sample data from your Printers.tsx file
	const data: Printer[] = [
		{
			image:
				"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
			name: "Bambu-Lab X1Carbon",
			price: 1800,
			consumption: 50,
			upgrades: [
				{
					name: "Nozzle Biqu Hotend Revo RapidChange",
					price: 150,
					installDate: "01/02/2025",
				},
				{
					name: "2 x Rapid Change nozzle",
					price: 75,
					installDate: "01/02/2025",
				},
				{
					name: "AMS filament changer",
					price: 300,
					installDate: "01/02/2025",
				},
				{
					name: "rgb leds for tuning",
					price: 12.45,
					installDate: "01/02/2025",
				},
			],
			consumables: [
				{
					name: "Courroies axe y",
					lifeTime: 250,
					usedTime: 0,
					price: 50,
				},
				{
					name: "plaque chauffante",
					lifeTime: 50,
					usedTime: 0,
					price: 60,
				},
				{
					name: "Buse .1mm",
					lifeTime: 24,
					usedTime: 5,
					price: 74,
				},
			],
		},
		{
			image:
				"https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
			name: "Mars 3 Pro",
			price: 300,
			consumption: 50,
			upgrades: [
				{
					name: "Jacuzzy mode with bubbles",
					price: 45,
					installDate: "20/04/2025",
				},
			],
			consumables: [
				{
					name: "Courroies axe X",
					lifeTime: 250,
					usedTime: 0,
					price: 54,
				},
				{
					name: "plaque chauffante",
					lifeTime: 50,
					usedTime: 0,
					price: 66,
				},
			],
		},
		{
			image: "https://img.staticdj.com/78b4b1a181b236e46e401c5efe4df976.jpg",
			name: "Creality ender 3",
			price: 1800,
			consumption: 50,
			upgrades: [
				{
					name: "BLTouch Auto Bed Leveling Sensor",
					price: 69,
					installDate: "01/02/2025",
				},
				{
					name: "Y-Carriage Plate Upgrade",
					price: 75,
					installDate: "01/02/2025",
				},
				{
					name: "Adjustable Screen Mount for Ender 3 V2",
					price: 96.99,
					installDate: "01/02/2025",
				},
				{
					name: "Creality 3D Printer Enclosure",
					price: 80,
					installDate: "01/02/2025",
				},
				{
					name: "SD Card Extension Cable",
					price: 0.45,
					installDate: "01/02/2025",
				},
			],
			consumables: [
				{
					name: "Courroies axe X",
					lifeTime: 250,
					usedTime: 0,
					price: 55,
				},
				{
					name: "plaque chauffante",
					lifeTime: 50,
					usedTime: 0,
					price: 68,
				},
			],
		},
	];

	// Insert the data
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

	// Use a transaction to ensure all data is inserted
	const insertPrinterWithRelations = db.transaction((printer: Printer) => {
		const printerResult = insertPrinter.run(
			printer.name,
			printer.image,
			printer.price,
			printer.consumption
		);
		const printerId = printerResult.lastInsertRowid as number;

		// Insert upgrades
		for (const upgrade of printer.upgrades) {
			insertUpgrade.run(
				upgrade.name,
				upgrade.price,
				upgrade.installDate,
				printerId
			);
		}

		// Insert consumables
		for (const consumable of printer.consumables) {
			insertConsumable.run(
				consumable.name,
				consumable.lifeTime,
				consumable.usedTime,
				consumable.price,
				printerId
			);
		}

		return printerId;
	});

	// Seed the database with initial data
	for (const printer of data) {
		insertPrinterWithRelations(printer);
	}

	console.log("Database seeded with initial data");
}

export { db };
