import type { MetaFunction } from "@remix-run/node";
import Invoices from "~/Components/Invoices";

export const meta: MetaFunction = () => {
	return [
		{ title: "Coucou" },
		{ name: "description", content: "Welcome to the jungle!" },
	];
};

export default function Index() {
	return (
		<>
			{/* <Mainpage /> */}
			<Invoices />
		</>
	);
}
