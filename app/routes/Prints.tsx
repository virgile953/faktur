import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
	getAllPrints,
	createPrint,
	updatePrint,
	deletePrint,
} from "~/db/prints.server";
import Prints from "~/Components/Prints";
import { print } from "~/types/Print";
import { getAllPrinters } from "~/db/printers.server";
import { getAllFilaments } from "~/db/filaments.server";

export async function loader({}: LoaderFunctionArgs) {
	const prints = getAllPrints();
	const printers = getAllPrinters();
	const filaments = getAllFilaments();
	return { prints, printers, filaments };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const actionType = formData.get("_action");

	if (actionType === "delete") {
		const printId = Number(formData.get("printId"));
		deletePrint(printId);
		return { success: true };
	}

	if (actionType === "create") {
		const printData: print = JSON.parse(formData.get("printData") as string);
		const newPrint = createPrint(printData);
		return { success: true, print: newPrint };
	}

	if (actionType === "update") {
		const printData: print = JSON.parse(formData.get("printData") as string);
		const updatedPrint = updatePrint(printData);
		return { success: true, print: updatedPrint };
	}

	return { success: false };
}

export default function PrintsPage() {
	const { prints, printers, filaments } = useLoaderData<typeof loader>();

	return (
		<Prints initialPrints={prints} Printers={printers} Filaments={filaments} />
	);
}
