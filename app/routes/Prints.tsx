import Prints from "~/Components/Prints";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import {
	getAllPrinters,
	createPrinter,
	deletePrinter,
	updatePrinter,
} from "~/db/printers.server";
import {
	getAllFilaments,
	createFilament,
	updateFilament,
	deleteFilament,
} from "~/db/filaments.server";
import Printers from "~/Components/Printers";
import { Printer } from "~/types/Printer";

export async function loader({}: LoaderFunctionArgs) {
	const printers = getAllPrinters();
	const filaments = getAllFilaments();
	return { printers, filaments };
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Prints" },
		{ name: "description", content: "Welcome to the jungle!" },
	];
};

export default function PrintsPage() {
	const { printers, filaments } = useLoaderData<typeof loader>();
	return (
		<>
			<Prints Printers={printers} Filaments={filaments}/>
		</>
	);
}
