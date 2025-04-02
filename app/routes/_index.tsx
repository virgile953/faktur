import Mainpage from "~/Components/Mainpage";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
	MetaFunction,
	useLoaderData,
	Outlet,
	useLocation,
} from "@remix-run/react";
import { getPrintersUsage, getFilamentsUsage } from "~/db/mainpage.server";
import Prints from "~/Components/Prints";
import { print } from "~/types/Print";
import { getAllPrinters } from "~/db/printers.server";
import { getAllFilaments } from "~/db/filaments.server";
export const meta: MetaFunction = () => {
	return [
		{ title: "Coucou" },
		{ name: "description", content: "Welcome to the jungle!" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const printersData = getPrintersUsage();
	const filamentsData = getFilamentsUsage();
	return { printersData, filamentsData };
}
export default function Index() {
	const { printersData, filamentsData } = useLoaderData<typeof loader>();

	return (
		<>
			<Mainpage printersData={printersData} filamentsData={filamentsData} />
		</>
	);
}
