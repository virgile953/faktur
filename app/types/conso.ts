import { Printer } from "./Printer";

export type Conso = {
	id?: number;
	printerId: number;
	filamentType: string;
	consoKw: number;
};

export type ConsoFull = {
	id?: number;
	printer: Printer;
	filamentType: string;
	consoKw: number;
};
