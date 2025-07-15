export type print = {
	id?: number;
	name: string;
	date: Date;
	printerUsed: number;
	filamentsUsed: number[];
	client: number;
	filamentsQuantity: number[];
	timeToModel: number;
	timeToPrint: number;
	timeToPostProcess: number;
	file: string;
	image: string;
	usedUpgrades: number[];
	usedConsumables: number[];
};
