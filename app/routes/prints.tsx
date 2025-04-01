import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData, Outlet, useLocation } from "@remix-run/react";
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

export const meta: MetaFunction = () => {
	return [
		{ title: "Prints" },
		{ name: "Prints", content: "List of done prints" },
	];
};

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
	const location = useLocation();

	// Only show the Outlet component when we're on a nested route
	// and hide the parent content
	const isNestedRoute = location.pathname.toLowerCase() !== "/prints";

	if (isNestedRoute) {
		return <Outlet />;
	}

	return (
		<>
			<Prints initialPrints={prints} Printers={printers} Filaments={filaments} />
		</>
	);
}
