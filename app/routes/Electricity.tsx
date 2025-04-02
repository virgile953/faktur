import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ElectricityConfig from "~/Components/Electricity";
import Invoices from "~/Components/Invoices";
import { getFilamentMaterials } from "~/db/filaments.server";
import { getAllPrinters } from "~/db/printers.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Invoices" },
		{ name: "Invoices", content: "List of invoices" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const materials = getFilamentMaterials();
	const printers = getAllPrinters();
	return { materials, printers };
}

export default function Electricity() {
	const { materials, printers } = useLoaderData<typeof loader>();

	return (
		<div>
			<ElectricityConfig filaments={materials} printers={printers} />
		</div>
	);
}
