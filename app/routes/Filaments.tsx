import type { MetaFunction } from "@remix-run/node";
import Mainpage from "~/Components/Mainpage";
import { useLocation } from "@remix-run/react";
import Filaments from "~/Components/Filaments";

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
			<Filaments />
		</>
	);
}
