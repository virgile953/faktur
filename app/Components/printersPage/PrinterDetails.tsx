import { Printer } from "~/types/Printer";
import GenericTable from "~/Components/ui/GenericTable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface PrinterDetailsProps {
	selectedPrinter: Printer;
	setNewPrinter: (printer: Printer) => void;
}

export default function PrinterDetails({
	selectedPrinter,
	setNewPrinter,
}: PrinterDetailsProps) {
	return (
		<div className="mx-auto max-w-7xl m-4 rounded-xl border border-gray-700 grid grid-cols-3">
			{/* Printer details - first two columns */}
			<div className="w-full p-2 col-span-2">
				<div className="flex flex-row justify-between mr-2 p-2 text-xl">
					<div>{selectedPrinter.name}</div>
					<div>{selectedPrinter.price + " €"}</div>
				</div>

				{/* Options table */}
				<div className="p-2">
					<h1 className="text-base mb-2">Options:</h1>
					<div className="max-h-60 overflow-y-auto">
						<GenericTable
							data={selectedPrinter.upgrades}
							headers={[
								{ key: "installDate", label: "Date" },
								{ key: "name", label: "Name" },
								{ key: "price", label: "Price" },
							]}
							showRemoveButton={false}
						/>
					</div>
				</div>

				{/* Consumables table */}
				<div className="p-2 overflow-hidden">
					<h1 className="text-base mb-2">Consumables:</h1>
					<div className="max-h-60 overflow-y-auto">
						<GenericTable
							data={selectedPrinter.consumables}
							headers={[
								{ key: "name", label: "Name" },
								{ key: "lifeTime", label: "Expected Lifetime" },
								{ key: "usedTime", label: "Used Time" },
								{ key: "price", label: "Price" },
							]}
							showRemoveButton={false}
						/>
					</div>
				</div>
			</div>

			{/* Printer image */}
			<div className="justify-self-end w-full h-full">
				<img
					src={selectedPrinter.image}
					alt={selectedPrinter.name}
					className="h-full w-full rounded-r-xl object-cover"
				/>
				{/* Edit and delete buttons */}
				<div className="col-span-2 relative -inset-y-12 -inset-x-4 flex justify-end gap-4 ">
					<button
						className="bg-gray-800 py-2 px-4 rounded-lg flex flex-row gap-2"
						onClick={() => setNewPrinter(selectedPrinter)}
					>
						<PencilSquareIcon height={24} />
						Edit
					</button>
					<form method="post">
						<input type="hidden" name="_action" value="delete" />
						<input type="hidden" name="printerId" value={selectedPrinter.id} />
						<button
							type="submit"
							className="bg-red-800 py-2 px-4 rounded-lg flex flex-row gap-2"
						>
							<TrashIcon height={24} />
							Delete
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
