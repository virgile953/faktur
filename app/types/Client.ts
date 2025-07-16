import { print } from "./Print";

export type Client = {
	id?: number;
	name: string;
	email: string;
	phone: string;
	address: string;
	prints?: print[];
	archived?: boolean;
};
