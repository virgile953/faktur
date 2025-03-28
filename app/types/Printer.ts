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
}

export interface Printer {
	id?: number;
	image: string;
	name: string;
	cost: number;
	consumption: number;
	upgrades: Upgrade[];
	consumables: Consumable[];
}