import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Invoices from "~/Components/Invoices";
import { getAllConso } from "~/db/conso.server";
import { getAllFilaments } from "~/db/filaments.server";
import { getAllPrinters } from "~/db/printers.server";
import { getAllPrints } from "~/db/prints.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Invoices" },
		{ name: "Invoices", content: "List of invoices" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const consos = getAllConso();
	const printers = getAllPrinters();
	const filaments = getAllFilaments();
	const prints = getAllPrints();
	return { consos, printers, filaments, prints };
}

export default function InvoicessPage() {
	const { consos, printers, filaments, prints } = useLoaderData<typeof loader>();

	return (
		<>
			<Invoices />
		</>
	);
}
