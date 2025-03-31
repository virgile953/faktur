import { useEffect, useState } from "react";
import { useSubmit } from "@remix-run/react";
import Navbar from "./ui/Navbar";
import FilamentsList from "./filamentsPage/FilamentsList";
import FilamentDetails from "./filamentsPage/FilamentDetails";
import BaseInfos from "./filamentsPage/newFilament/baseInfos";
import { Filament } from "~/types/Filament";

const NewFilament: Filament = {
	id: undefined,
	brand: "",
	color: "",
	description: "",
	image: "",
	material: "",
	name: "",
	price: 0,
	quantity: 0,
	unit: "ml",
};

function Filaments({ initialFilaments }: { initialFilaments: Filament[] }) {
	const [filaments, setFilaments] = useState(initialFilaments);
	const [selectedFilament, setSelectedFilament] = useState(initialFilaments[0]);
	const [newFilament, setNewFilament] = useState(NewFilament);

	const submit = useSubmit();

	function createFilament(): void {
		if (!newFilament.name || !newFilament.image || newFilament.price <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}

		submit(
			{ filamentData: JSON.stringify(newFilament), _action: "create" },
			{ method: "post", encType: "multipart/form-data" }
		);

		setFilaments([...filaments, { ...newFilament, id: Date.now() }]);
		setNewFilament(NewFilament);
	}

	function updateFilament(): void {
		if (!newFilament.name || !newFilament.image || newFilament.price <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}

		submit(
			{ filamentData: JSON.stringify(newFilament), _action: "update" },
			{ method: "put", encType: "multipart/form-data" }
		);

		setNewFilament(NewFilament);
	}

	function deleteFilament(filamentId: number): void {
		submit(
			{ filamentId: String(filamentId), _action: "delete" },
			{ method: "post", encType: "multipart/form-data" }
		);

		setFilaments(filaments.filter((filament) => filament.id !== filamentId));
	}

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto">
				{/* Filaments List */}
				<FilamentsList
					data={filaments}
					selectedFilament={selectedFilament}
					setSelectedFilament={setSelectedFilament}
				/>

				{/* Filament Details */}
				<FilamentDetails
					selectedFilament={selectedFilament}
					setNewFilament={setNewFilament}
				/>

				{/* Create or Update a Filament */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-700 rounded-lg p-4">
					{/* Form Section */}
					<div className="col-span-2">
						<h1 className="text-xl mb-4">
							{newFilament.id == undefined ? "Add" : "Update"} a Filament
						</h1>
						<BaseInfos
							newFilament={newFilament}
							setNewFilament={setNewFilament}
						/>
					</div>

					{/* Image Preview Section */}
					<div className="flex flex-col items-center justify-center">
						{newFilament.image ? (
							<img
								src={newFilament.image}
								alt="Filament preview"
								className="h-64 w-full rounded-lg object-cover border border-gray-700"
							/>
						) : (
							<div className="h-64 w-full rounded-lg border border-gray-700 flex items-center justify-center text-gray-500">
								Filament image preview
							</div>
						)}
						<label className="flex flex-col gap-1 w-full">
							Description
							<textarea
								className="bg-gray-900 min-h-32 rounded-lg pl-2 p-1 resize-none"
								value={newFilament.description || ""}
								onChange={(e) =>
									setNewFilament({
										...newFilament,
										description: e.target.value,
									})
								}
							/>
						</label>
					</div>
					<button
						className="max-w-24 p-2  bg-gray-900 rounded-lg border border-gray-700"
						onClick={() =>
							newFilament.id == undefined ? createFilament() : updateFilament()
						}
					>
						{newFilament.id == undefined ? "Add" : "Update"}
					</button>
				</div>

			</div>
		</>
	);
}

export default Filaments;
