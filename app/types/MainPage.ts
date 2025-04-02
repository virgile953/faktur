import { Filament } from "./Filament";
import { Printer } from "./Printer";

export type MainPagePrinters = {
	nbPrints: number;
	lastPrintDate: string;
	printer: Printer;
};

export type MainPageFilaments = {
	nbPrints: number;
	lastPrintDate: string;
	filament: Filament;
};
