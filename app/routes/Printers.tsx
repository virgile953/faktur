import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
	getAllPrinters,
	createPrinter,
	deletePrinter,
	updatePrinter,
} from "~/db/printers.server";
import Printers from "~/Components/Printers";
import { Printer } from "~/types/Printer";

export async function loader({}: LoaderFunctionArgs) {
	const printers = getAllPrinters();
	return { printers };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const actionType = formData.get("_action");

	if (actionType === "delete") {
		const printerId = Number(formData.get("printerId"));
		deletePrinter(printerId);
		return { success: true };
	}

	if (actionType === "create") {
		const printerData: Printer = JSON.parse(formData.get("printerData") as string);
		const newPrinter = createPrinter(printerData);
		return { success: true, printer: newPrinter };
	}
	if (actionType === "update") {
		const printerData = JSON.parse(formData.get("printerData") as string);
		const updatedPrinter = updatePrinter(printerData);
		return { success: true, printer: updatedPrinter };
	}

	return { success: false };
}

export default function PrintersPage() {
	const { printers } = useLoaderData<typeof loader>();

	return <Printers initialPrinters={printers} />;
}
