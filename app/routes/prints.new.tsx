import {
	useLoaderData,
	useSubmit,
	Form,
	redirect,
	MetaFunction,
} from "@remix-run/react";
import NewPrintForm from "~/Components/printsPage/NewPrintForm";
import { print } from "~/types/Print";
import { getAllPrinters } from "~/db/printers.server";
import { getAllFilaments } from "~/db/filaments.server";
import Navbar from "~/Components/ui/Navbar";
import { ActionFunctionArgs } from "@remix-run/node";
import { createPrint } from "~/db/prints.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Print" },
		{ name: "New Print", content: "Create a new print" },
	];
};

export async function loader() {
	const printers = getAllPrinters();
	const filaments = getAllFilaments();
	return { printers, filaments };
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const printData = JSON.parse(formData.get("printData") as string);

	createPrint(printData);
	return redirect("/prints");
}

export default function NewPrintPage() {
	const { printers, filaments } = useLoaderData<typeof loader>();
	const submit = useSubmit();

	// Handle form submission
	const handleSubmit = (printData: print) => {
		submit(
			{ printData: JSON.stringify(printData), _action: "create" },
			{ method: "post", encType: "multipart/form-data" }
		);
	};

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				<NewPrintForm
					printers={printers}
					filaments={filaments}
					onSubmit={handleSubmit}
				/>
			</div>
		</>
	);
}
