import type { MetaFunction } from "@remix-run/node";
import Filaments from "~/Components/Filaments";

export const meta: MetaFunction = () => {
	return [
		{ title: "Coucou" },
		{ name: "description", content: "Welcome to the jungle!" },
	];
};

export default function Index() {
	return <Filaments />;
}
