import { Link } from "@remix-run/react";
import { useState } from "react";
import { print } from "~/types/Print";
import { Printer } from "~/types/Printer";
import { Filament } from "~/types/Filament";
import FilterSelect from "../Prints/FilterSelect";

interface NewPrintFormProps {
	printers: Printer[];
	filaments: Filament[];
	onSubmit: (printData: print) => void;
}

export default function NewPrintForm({
	printers,
	filaments,
	onSubmit,
}: NewPrintFormProps) {
	const [newPrint, setNewPrint] = useState<print>({
		name: "",
		date: new Date().toLocaleDateString("fr-FR"),
		client: 0,
		printerUsed: 0,
		filamentsUsed: [],
		timeToPrint: 0,
		image: "",
		filamentQuantity: 0,
		file: "",
		usedUpgrades: [],
		usedConsumables: [],
	});

	// Track selected filaments
	const [selectedFilaments, setSelectedFilaments] = useState<number[]>([]);

	// Handle filament selection
	const handleFilamentSelect = (filamentId: number) => {
		if (selectedFilaments.includes(filamentId)) {
			setSelectedFilaments(selectedFilaments.filter((id) => id !== filamentId));
			setNewPrint({
				...newPrint,
				filamentsUsed: newPrint.filamentsUsed.filter((id) => id !== filamentId),
			});
		} else {
			setSelectedFilaments([...selectedFilaments, filamentId]);
			setNewPrint({
				...newPrint,
				filamentsUsed: [...newPrint.filamentsUsed, filamentId],
			});
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4">
			<h1 className="border border-gray-700 p-2 rounded-lg text-3xl mb-4">
				Create a New Print
			</h1>

			{/* Printer selector */}
			<label className="flex flex-col gap-1 mb-2">
				Printer Used

				<FilterSelect
					items={printers}
					selectedItem={
						printers.find((printer) => printer.id === newPrint.printerUsed) ||
						null
					}
					setSelectedItem={(printer) =>
						setNewPrint({ ...newPrint, printerUsed: printer!.id! })
					}
					showAll={false}
					label="Printer"
				/>
			</label>

			<div className="border border-gray-700 p-6 rounded-lg grid grid-cols-2 gap-4">
				{/* Print Name */}
				<label className="flex flex-col gap-1 mb-2">
					Print Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.name}
						onChange={(e) => setNewPrint({ ...newPrint, name: e.target.value })}
						placeholder="Enter print name"
					/>
				</label>

				{/* Client */}
				<label className="flex flex-col gap-1 mb-2">
					Client
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.client || ""}
						onChange={(e) =>
							setNewPrint({ ...newPrint, client: Number(e.target.value) })
						}
						placeholder="Select client"
					/>
				</label>

				{/* Print Date */}
				<label className="flex flex-col gap-1 mb-2">
					Print Date
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="date"
						value={new Date(newPrint.date).toISOString().split("T")[0]}
						onChange={(e) =>
							setNewPrint({
								...newPrint,
								date: e.target.value,
							})
						}
					/>
				</label>

				{/* Filament Quantity */}
				<label className="flex flex-col gap-1 mb-2">
					Filament Quantity
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							type="number"
							value={newPrint.filamentQuantity || ""}
							onChange={(e) =>
								setNewPrint({
									...newPrint,
									filamentQuantity: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
						<span className="ml-2">g</span>
					</div>
				</label>

				{/* Print Time */}
				<label className="flex flex-col gap-1 mb-2">
					Print Time
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							type="number"
							value={newPrint.timeToPrint || ""}
							onChange={(e) =>
								setNewPrint({
									...newPrint,
									timeToPrint: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
						<span className="ml-2">h</span>
					</div>
				</label>

				{/* Image URL */}
				<label className="flex flex-col gap-1 mb-2">
					Image URL
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.image}
						onChange={(e) =>
							setNewPrint({ ...newPrint, image: e.target.value })
						}
						placeholder="https://example.com/image.jpg"
					/>
				</label>

				{/* File URL */}
				<label className="flex flex-col gap-1 mb-2">
					File URL
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.file}
						onChange={(e) => setNewPrint({ ...newPrint, file: e.target.value })}
						placeholder="https://example.com/model.stl"
					/>
				</label>

				{/* Filaments selector */}
				<div className="col-span-2">
					<label className="block mb-2">Filaments Used</label>
					<div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-gray-700 rounded-lg">
						{filaments.map((filament) => (
							<div
								key={filament.id}
								onClick={() => handleFilamentSelect(filament.id!)}
								className={`rounded cursor-pointer flex items-center gap-2 h-12 ${
									selectedFilaments.includes(filament.id!)
										? "bg-blue-600"
										: "bg-gray-800"
								}`}
							>
								<img
									src={`${filament.image}`}
									alt={filament.name}
									className="h-12 w-12 rounded-l-lg"
								/>
								{filament.name}
							</div>
						))}
					</div>
				</div>

				{/* Image preview */}
				<div className="col-span-2 mt-4">
					<label className="block mb-2">Image Preview</label>
					<div className="h-48 w-full border border-gray-700 rounded-lg overflow-hidden">
						{newPrint.image ? (
							<img
								src={newPrint.image}
								alt="Print preview"
								className="h-full w-full object-contain"
							/>
						) : (
							<div className="flex items-center justify-center h-full text-gray-500">
								No image preview available
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex justify-end gap-4 mt-4">
				<Link to="/prints">
					<button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
						Cancel
					</button>
				</Link>
				<button
					className="bg-gradient-to-t from-gray-900 to-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
					onClick={() => onSubmit(newPrint)}
				>
					Create Print
				</button>
			</div>
		</div>
	);
}
