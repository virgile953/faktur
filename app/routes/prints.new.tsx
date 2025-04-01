import { Link, MetaFunction } from "@remix-run/react";
import { useState } from "react";
import { print } from "~/types/Print";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Print" },
		{ name: "New Print", content: "Create a new print" },
	];
};

export default function NewPrintPage() {
	const [NewPrint, setNewPrint] = useState<print>({
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

	return (
		<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4">
			<h1 className="border border-gray-700 p-2 rounded-lg text-3xl mb-4">
				Create a New Print
			</h1>
			{/* Printer Used */}
			<label className="flex flex-col gap-1 mb-2">
				Printer Used
				<input
					className="bg-gray-900 rounded-lg pl-2 p-1"
					type="text"
					value={NewPrint.printerUsed || ""}
					onChange={(e) =>
						setNewPrint({ ...NewPrint, printerUsed: Number(e.target.value) })
					}
					placeholder="Select printer"
				/>
			</label>
			<div className="border border-gray-700 p-6 rounded-lg grid grid-cols-2 gap-4">
				{/* Print Name */}
				<label className="flex flex-col gap-1 mb-2">
					Print Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={NewPrint.name}
						onChange={(e) => setNewPrint({ ...NewPrint, name: e.target.value })}
						placeholder="Enter print name"
					/>
				</label>

				{/* Client */}
				<label className="flex flex-col gap-1 mb-2">
					Client
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={NewPrint.client || ""}
						onChange={(e) =>
							setNewPrint({ ...NewPrint, client: Number(e.target.value) })
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
						value={NewPrint.date}
						onChange={(e) =>
							setNewPrint({
								...NewPrint,
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
							value={NewPrint.filamentQuantity || ""}
							onChange={(e) =>
								setNewPrint({
									...NewPrint,
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
							value={NewPrint.timeToPrint || ""}
							onChange={(e) =>
								setNewPrint({
									...NewPrint,
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
						value={NewPrint.image}
						onChange={(e) =>
							setNewPrint({ ...NewPrint, image: e.target.value })
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
						value={NewPrint.file}
						onChange={(e) => setNewPrint({ ...NewPrint, file: e.target.value })}
						placeholder="https://example.com/model.stl"
					/>
				</label>

				{/* Add image preview like in printer component */}
				<div className="col-span-2 mt-4">
					<label className="block mb-2">Image Preview</label>
					<div className="h-48 w-full border border-gray-700 rounded-lg overflow-hidden">
						{NewPrint.image ? (
							<img
								src={NewPrint.image}
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
					onClick={() => {
						// Handle form submission
						console.log("New Print Created:", NewPrint);
					}}
				>
					Create Print
				</button>
			</div>
		</div>
	);
}
