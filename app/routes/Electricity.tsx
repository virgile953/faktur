import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ElectricityConfig from "~/Components/Electricity";
import { getAllConso, getElecPrice } from "~/db/conso.server";
import { getFilamentMaterials } from "~/db/filaments.server";
import { getAllPrinters } from "~/db/printers.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Electricity costs" },
		{ name: "Electricity", content: "List of consumptions" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const materials = getFilamentMaterials();
	const getDisplayElecData = getAllConso();
	const printers = getAllPrinters();
	const electPrice = getElecPrice();
	return { materials, printers, electPrice, getDisplayElecData };
}

export default function Electricity() {
	const { materials, printers, electPrice, getDisplayElecData } =
		useLoaderData<typeof loader>();

	return (
		<div>
			<ElectricityConfig
				filaments={materials}
				printers={printers}
				elecPrice={electPrice}
				consoData={getDisplayElecData}
			/>
		</div>
	);
}
