import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import Clients from "~/Components/Clients";
import { getClients, createClient, updateClient, deleteClient } from "~/db/clients.server";
import { Client } from "~/types/Client";

export const meta: MetaFunction = () => {
	return [
		{ title: "Clients" },
		{ name: "Clients", content: "List of clients" },
	];
};

export async function loader({}: LoaderFunctionArgs) {
	const clients = getClients();
	return { clients };
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const action = formData.get("action") as string;

	switch (action) {
		case "create": {
			const client: Client = {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				phone: formData.get("phone") as string,
				address: formData.get("address") as string,
			};
			createClient(client);
			return { success: true };
		}
		case "update": {
			const client: Client = {
				id: parseInt(formData.get("id") as string),
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				phone: formData.get("phone") as string,
				address: formData.get("address") as string,
			};
			updateClient(client);
			return { success: true };
		}
		case "delete": {
			const id = parseInt(formData.get("id") as string);
			deleteClient(id);
			return { success: true };
		}
		default:
			return { success: false };
	}
}

export default function ClientsPage() {
	const { clients } = useLoaderData<typeof loader>();

	return (
		<>
			<Clients clients={clients} />
		</>
	);
}
