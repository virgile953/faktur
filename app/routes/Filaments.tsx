import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
	getAllFilaments,
	createFilament,
	updateFilament,
	deleteFilament,
} from "~/db/filaments.server";
import Filaments from "~/Components/Filaments";
import { Filament } from "~/types/Filament";

export const meta: MetaFunction = () => {
	return [
		{ title: "Coucou" },
		{ name: "description", content: "Welcome to the jungle!" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const filaments = getAllFilaments();
	return { filaments };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const actionType = formData.get("_action");

	if (actionType === "delete") {
		const filamentId = Number(formData.get("filamentId"));
		deleteFilament(filamentId);
		return { success: true };
	}

	if (actionType === "create") {
		const filamentData: Filament = JSON.parse(
			formData.get("filamentData") as string
		);
		const newFilament = createFilament(filamentData);
		return { success: true, filament: newFilament };
	}

	if (actionType === "update") {
		const filamentData: Filament = JSON.parse(
			formData.get("filamentData") as string
		);
		const updatedFilament = updateFilament(filamentData);
		return { success: true, filament: updatedFilament };
	}

	return { success: false };
}

export default function FilamentsPage() {
	const { filaments } = useLoaderData<typeof loader>();

	return <Filaments initialFilaments={filaments} />;
}
