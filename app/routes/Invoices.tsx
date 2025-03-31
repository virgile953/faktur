import type { MetaFunction } from "@remix-run/node";
import Invoices from "~/Components/Invoices";

export const meta: MetaFunction = () => {
	return [
		{ title: "Invoices" },
		{ name: "Invoices", content: "List of invoices" },
	];
};

export default function InvoicessPage() {
	return (
		<>
			<Invoices />
		</>
	);
}
