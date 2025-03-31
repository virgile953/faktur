import { db } from "./schema.server";
import { Filament } from "~/types/Filament";

// Get all filaments
export function getAllFilaments(): Filament[] {
	const filaments = db
		.prepare(
			`
				SELECT * FROM filaments
				WHERE archived = 0
				ORDER BY name
		`
		)
		.all() as Filament[];

	return filaments;
}

// Get a single filament by ID
export function getFilamentById(id: number): Filament | null {
	const filament = db
		.prepare(
			`
				SELECT * FROM filaments WHERE id = ?
		`
		)
		.get(id) as Filament | undefined;

	return filament || null;
}

// Create a new filament
export function createFilament(filament: Filament): Filament {
	const insertFilament = db.prepare(`
				INSERT INTO filaments (name, image, material, brand, description, price, quantity, unit, color)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

	const result = insertFilament.run(
		filament.name,
		filament.image,
		filament.material,
		filament.brand,
		filament.description,
		filament.price,
		filament.quantity,
		filament.unit,
		filament.color
	);

	const newFilamentId = result.lastInsertRowid as number;

	return getFilamentById(newFilamentId)!;
}

// Update an existing filament
export function updateFilament(filament: Filament): Filament | null {
	const { id } = filament;
	if (!id) return null;

	const updateFilamentStmt = db.prepare(`
				UPDATE filaments
				SET name = ?, image = ?, material = ?, brand = ?, description = ?, price = ?, quantity = ?, unit = ?, color = ?
				WHERE id = ?
		`);

	updateFilamentStmt.run(
		filament.name,
		filament.image,
		filament.material,
		filament.brand,
		filament.description,
		filament.price,
		filament.quantity,
		filament.unit,
		filament.color,
		id
	);

	return getFilamentById(id);
}

// Delete a filament (soft delete by setting archived = 1)
export function deleteFilament(id: number): boolean {
	const result = db
		.prepare(`UPDATE filaments SET archived = 1 WHERE id = ?`)
		.run(id);

	return result.changes > 0;
}
