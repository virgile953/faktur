import { useEffect, useState } from "react";
import { useSubmit } from "@remix-run/react";
import Navbar from "./ui/Navbar";
import FilamentsList from "./filamentsPage/FilamentsList";
import FilamentDetails from "./filamentsPage/FilamentDetails";
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

	useEffect(() => {
		console.log(selectedFilament);
	}, [selectedFilament]);

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4">
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
						<div className="grid grid-cols-1 gap-4">
							<div className="grid grid-cols-10 gap-4">
								<label className="flex flex-col gap-1 col-span-7">
									Name
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.name || ""}
										onChange={(e) =>
											setNewFilament({ ...newFilament, name: e.target.value })
										}
									/>
								</label>
								<label className="flex flex-col gap-1 col-span-3">
									Price
									<div className="flex flex-row items-center">
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
											value={newFilament.price || 0}
											type="number"
											onChange={(e) =>
												setNewFilament({
													...newFilament,
													price: Number(e.target.value),
												})
											}
										/>
										<span className="ml-2">€</span>
									</div>
								</label>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<label className="flex flex-col gap-1">
									Brand
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.brand || ""}
										onChange={(e) =>
											setNewFilament({ ...newFilament, brand: e.target.value })
										}
									/>
								</label>
								<label className="flex flex-col gap-1">
									Material
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.material || ""}
										onChange={(e) =>
											setNewFilament({
												...newFilament,
												material: e.target.value,
											})
										}
									/>
								</label>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<label className="flex flex-col gap-1">
									Color
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.color || ""}
										onChange={(e) =>
											setNewFilament({ ...newFilament, color: e.target.value })
										}
									/>
								</label>
								<label className="flex flex-col gap-1">
									Image
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.image || ""}
										onChange={(e) =>
											setNewFilament({ ...newFilament, image: e.target.value })
										}
									/>
								</label>
							</div>

							<div className="grid grid-cols-5 gap-4">
								<label className="flex flex-col gap-1 col-span-3">
									Quantity
									<div className="w-full flex  flex-row">
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
											type="number"
											value={newFilament.quantity || ""}
											onChange={(e) =>
												setNewFilament({
													...newFilament,
													quantity: Number(e.target.value),
												})
											}
										/>
										<span className="-ml-10 mt-1">{newFilament.unit}</span>
									</div>
								</label>
								<label className="flex flex-col gap-1 col-span-2">
									Unit
									<select
										className="bg-gray-900 rounded-lg pl-2 p-1"
										value={newFilament.unit}
										onChange={(e) =>
											setNewFilament({
												...newFilament,
												unit: e.target.value,
											})
										}
									>
										<option value={"g"}>grams</option>
										<option value={"ml"}>milliliters</option>
									</select>
								</label>
							</div>
						</div>
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
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	);
}

export default Filaments;
