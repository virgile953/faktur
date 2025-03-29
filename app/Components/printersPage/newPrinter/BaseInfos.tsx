import { Form } from "@remix-run/react";
import { Printer } from "~/types/Printer";

// Base information form
export default function NewPrinterBase({
	setNewPrinter,
	newPrinter,
}: {
	setNewPrinter: (printer: Printer) => void;
	newPrinter: Printer;
}) {
	return (
		<Form className="grid grid-cols-3 grid-flow-row w-full gap-6">
			<div className="col-span-2">
				<label className="flex flex-col gap-1 mb-2" htmlFor="printerName">
					Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerName"
						value={newPrinter.name || ""}
						onChange={(e) =>
							setNewPrinter({ ...newPrinter, name: e.target.value })
						}
					/>
				</label>

				<label className="flex flex-col gap-1 mb-2" htmlFor="printerCost">
					Price
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							id="printerCost"
							type="number"
							value={newPrinter.price || ""}
							onChange={(e) =>
								setNewPrinter({
									...newPrinter,
									price: Number(e.target.value),
								})
							}
						/>
						<span className="ml-2">€</span>
					</div>
				</label>

				<label className="flex flex-col gap-1 mb-2" htmlFor="printerImage">
					Image
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerImage"
						value={newPrinter.image || ""}
						onChange={(e) =>
							setNewPrinter({
								...newPrinter,
								image: e.target.value,
							})
						}
					/>
				</label>
				<label
					className="flex flex-col gap-1 mb-2"
					htmlFor="printerConsumption"
				>
					Consumption (kw/h)
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							id="printerConsumption"
							type="number"
							value={newPrinter.consumption || ""}
							onChange={(e) =>
								setNewPrinter({
									...newPrinter,
									consumption: Number(e.target.value),
								})
							}
						/>
						<span className="ml-2">kW/h</span>
					</div>
				</label>
			</div>

			{/* Image preview */}
			<div className="justify-self-end w-full h-full">
				{newPrinter.image ? (
					<img
						src={newPrinter.image}
						alt="Printer preview"
						className="h-full w-full rounded-r-xl object-cover border border-gray-700"
					/>
				) : (
					<div className="h-full w-full rounded-r-xl border border-gray-700 flex items-center justify-center text-gray-500">
						Printer image preview
					</div>
				)}
			</div>
		</Form>
	);
}
