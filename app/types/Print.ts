export type print = {
	id?: number;
	name: string;
	date: string;
	printerUsed: number;
	filamentUsed: number[];
	client: number;
	filamentQuantity: number;
	timeToPrint: number;
	margin: number;
	file: string;
	image: string;
	usedUpgrades: number[];
	usedConsumables: number[];
};