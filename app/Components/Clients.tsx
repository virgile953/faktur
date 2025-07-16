import { useState } from "react";
import { Client } from "~/types/Client";
import Modal from "./ui/Modal";
import { useFetcher } from "@remix-run/react";

export default function Clients({ clients }: { clients: Client[] }) {
	const [isNewOpen, setIsNewOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);

	// Form state for new client
	const [newClient, setNewClient] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

	// Form state for editing client
	const [editClient, setEditClient] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

	const fetcher = useFetcher();

	const handleEditOpen = (client: Client) => {
		setSelectedClient(client);
		setEditClient({
			name: client.name,
			email: client.email,
			phone: client.phone,
			address: client.address
		});
		setIsEditOpen(true);
	};

	const handleCreateClient = () => {
		fetcher.submit(
			{
				action: "create",
				...newClient
			},
			{ method: "POST" }
		);
		setNewClient({ name: "", email: "", phone: "", address: "" });
		setIsNewOpen(false);
	};

	const handleUpdateClient = () => {
		if (!selectedClient) return;

		fetcher.submit(
			{
				action: "update",
				id: selectedClient.id!.toString(),
				...editClient
			},
			{ method: "POST" }
		);
		setIsEditOpen(false);
		setSelectedClient(null);
	};

	const handleDeleteClient = (clientId: number) => {
		if (confirm("Are you sure you want to delete this client?")) {
			fetcher.submit(
				{
					action: "delete",
					id: clientId.toString()
				},
				{ method: "POST" }
			);
		}
	};

	return (
		<>
			{/* Edit Modal */}
			<Modal
				isOpen={isEditOpen}
				onClose={() => {
					setIsEditOpen(false);
					setSelectedClient(null);
				}}
				title={`Edit Client: ${selectedClient?.name || ''}`}
			>
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Client Name"
						value={editClient.name}
						onChange={(e) => setEditClient({...editClient, name: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<input
						type="email"
						placeholder="Email"
						value={editClient.email}
						onChange={(e) => setEditClient({...editClient, email: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<input
						type="tel"
						placeholder="Phone"
						value={editClient.phone}
						onChange={(e) => setEditClient({...editClient, phone: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<textarea
						placeholder="Address"
						value={editClient.address}
						onChange={(e) => setEditClient({...editClient, address: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
						rows={3}
					/>
				</div>
				<div className="flex justify-end gap-2 mt-6">
					<button
						onClick={() => setIsEditOpen(false)}
						className="bg-gray-600 text-white px-4 py-2 rounded"
					>
						Cancel
					</button>
					<button
						onClick={handleUpdateClient}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Save
					</button>
				</div>
			</Modal>

			{/* New Client Modal */}
			<Modal
				isOpen={isNewOpen}
				onClose={() => setIsNewOpen(false)}
				title="New Client"
			>
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Client Name"
						value={newClient.name}
						onChange={(e) => setNewClient({...newClient, name: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<input
						type="email"
						placeholder="Email"
						value={newClient.email}
						onChange={(e) => setNewClient({...newClient, email: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<input
						type="tel"
						placeholder="Phone"
						value={newClient.phone}
						onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
					/>
					<textarea
						placeholder="Address"
						value={newClient.address}
						onChange={(e) => setNewClient({...newClient, address: e.target.value})}
						className="w-full p-2 bg-gray-700 rounded"
						rows={3}
					/>
				</div>
				<div className="flex justify-end gap-2 mt-6">
					<button
						onClick={() => setIsNewOpen(false)}
						className="bg-gray-600 text-white px-4 py-2 rounded"
					>
						Cancel
					</button>
					<button
						onClick={handleCreateClient}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Create
					</button>
				</div>
			</Modal>

			<div className=" mt-[130px] p-4 w-full max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center border border-gray-700 rounded-lg">
				<div className="flex flex-row justify-between w-full">
					<button
						onClick={() => setIsNewOpen(true)}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						New Client
					</button>
				</div>
				{clients.map((client) => (
					<div key={client.id} className="p-4 border-b border-gray-700 w-full">
						<h2 className="text-xl font-bold">{client.name}</h2>
						<p>Email: {client.email}</p>
						<p>Phone: {client.phone}</p>
						<p>Address: {client.address}</p>
						{client.prints && client.prints.length > 0 ? (
							<div className="mt-2">
								<h3 className="text-lg font-semibold">Prints:</h3>
								<ul>
									{client.prints.map((print) => (
										<li key={print.id} className="mt-1">
											{print.name} -{" "}
											{new Date(print.date).toLocaleDateString("fr-FR")}
										</li>
									))}
								</ul>
							</div>
						) : null}
						<div className="flex flex-row gap-2 mt-4">
							<button
								onClick={() => handleEditOpen(client)}
								className="bg-yellow-500 text-white px-4 py-2 rounded"
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteClient(client.id!)}
								className="bg-red-500 text-white px-4 py-2 rounded"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
