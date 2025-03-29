import { Printer } from "~/types/Printer";

interface PrintersListProps {
	printers: Printer[];
	selectedPrinter: Printer;
	onSelectPrinter: (printer: Printer) => void;
}

export default function PrintersList({
	printers,
	selectedPrinter,
	onSelectPrinter,
}: PrintersListProps) {
	return (
		<div className="max-w-7xl mx-auto flex flex-row gap-0 overflow-x-auto relative">
			{printers.map((printer, index) => (
				<div
					key={index}
					className={`flex-shrink-0 flex flex-row m-2 min-w-72 border border-gray-700
					rounded-xl relative cursor-pointer
					${selectedPrinter == printer ? "bg-gray-900" : ""}`}
					onClick={() => onSelectPrinter(printer)}
				>
					<img
						src={printer.image}
						className="h-24 w-24 rounded-s-xl"
						alt={printer.name}
					/>
					<div className="flex flex-col p-2 text-sm justify-between">
						<div className="flex flex-col">
							<div>{printer.name}</div>
							<div>{printer.cost + " €"}</div>
						</div>
						<div className="relative group">
							<div className="text-xs">
								{printer.upgrades.length + " Options"}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
