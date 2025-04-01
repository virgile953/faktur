import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Printer } from "~/types/Printer";

interface FilterSelectProps {
	printers: Printer[];
	selectedPrinter: Printer | null;
	setSelectedPrinter: (printer: Printer | null) => void;
}

export default function FilterSelect({
	printers,
	selectedPrinter,
	setSelectedPrinter,
}: FilterSelectProps) {
	return (
		<Popover className="group min-w-64">
			<PopoverButton
				className="flex flex-row w-full border
					group-data-[open]:border-b-transparent group-data-[open]:rounded-b-none
					border-gray-700 rounded-lg items-center justify-between gap-1"
			>
				{selectedPrinter == null ? (
					<div className="p-2">Printer</div>
				) : (
					<div className="flex flex-row gap-4">
						<img
							className="h-10 rounded-lg"
							src={selectedPrinter.image}
							alt={selectedPrinter.name}
						/>
						<div className="mt-2">{selectedPrinter.name}</div>
					</div>
				)}
				<ChevronDownIcon
					className="align-bottom size-5 group-data-[open]:-rotate-180 transition duration-100"
				/>
			</PopoverButton>
			<PopoverPanel
				aria-orientation="vertical"
				anchor="bottom"
				className="divide-y divide-white/5 rounded-b-lg bg-black/95
					text-sm/6 ease-in-out 
					[data-[closed]:-translate-y-1 data-[closed]:opacity-0
					border border-gray-700 w-64"
			>
				{({ close }) => (
					<>
						{selectedPrinter && (
							<div
								key="remove-filter"
								className="rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium cursor-pointer"
								onClick={() => {
									setSelectedPrinter(null);
									close();
								}}
							>
								<div className="flex flex-row gap-4">
									<img
										className="h-10 bg-white rounded-lg"
										src="/removeFilter.svg"
										alt="Remove filter"
									/>
									<div className="mt-2">All printers</div>
								</div>
							</div>
						)}
						{printers.map((printer: Printer, index: number) => (
							<div
								key={index}
								className="rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium cursor-pointer"
								onClick={() => {
									setSelectedPrinter(printer);
									close();
								}}
							>
								<div className="flex flex-row gap-4">
									<img
										className="h-10 rounded-lg"
										src={printer.image}
										alt={printer.name}
									/>
									<div className="mt-2">{printer.name}</div>
								</div>
							</div>
						))}
					</>
				)}
			</PopoverPanel>
		</Popover>
	);
}
