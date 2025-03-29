import { Printer } from "~/types/Printer";
import GenericTable from "~/Components/ui/GenericTable";

interface PrinterDetailsProps {
	selectedPrinter: Printer;
}

export default function PrinterDetails({
	selectedPrinter,
}: PrinterDetailsProps) {
	return (
		<div className="mx-auto max-w-7xl m-4 rounded-xl border border-gray-700 grid grid-cols-3">
			{/* Printer details - first two columns */}
			<div className="w-full p-2 col-span-2">
				<div className="flex flex-row justify-between mr-2">
					<div>{selectedPrinter.name}</div>
					<div>{selectedPrinter.cost + " €"}</div>
				</div>

				{/* Options table */}
				<div className="p-2">
					<h1 className="text-base mb-2">Options:</h1>
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

				{/* Consumables table */}
				<div className="p-2">
					<h1 className="text-base mb-2">Consumables:</h1>
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

			{/* Printer image */}
			<div className="justify-self-end w-full h-full">
				<img
					src={selectedPrinter.image}
					alt={selectedPrinter.name}
					className="h-full w-full rounded-r-xl object-cover border border-red-700"
				/>
			</div>
		</div>
	);
}
