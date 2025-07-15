export interface Upgrade {
	id?: number;
	name: string;
	price: number;
	installDate: string;
	consumable?: Consumable
}

export interface Consumable {
	id?: number;
	name: string;
	lifeTime: number;
	usedTime: number;
	price: number;
}

export interface Printer {
	id?: number;
	image: string;
	name: string;
	price: number;
	consumption: number;
	upgrades: Upgrade[];
	consumables: Consumable[];
	canPrint: string[]; // e.g., ["PLA", "PETG", "ABS"]
}
