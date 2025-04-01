export type print = {
	id?: number;
	name: string;
	date: string;
	printerUsed: number;
	filamentsUsed: number[];
	client: number;
	filamentQuantity: number;
	timeToPrint: number;
	file: string;
	image: string;
	usedUpgrades: number[];
	usedConsumables: number[];
};