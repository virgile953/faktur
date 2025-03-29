import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllPrinters, createPrinter } from "~/db/printers.server";
import Printers from "~/Components/Printers";

export async function loader({}: LoaderFunctionArgs) {
	const printers = getAllPrinters();
	return { printers };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const printerData = JSON.parse(formData.get("printerData") as string);

	const newPrinter = createPrinter(printerData);
	return { success: true, printer: newPrinter };
}

export default function PrintersPage() {
	const { printers } = useLoaderData<typeof loader>();

	return <Printers initialPrinters={printers} />;
}
