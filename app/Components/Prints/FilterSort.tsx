import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { print } from "~/types/Print";

interface FilterSortProps {
	rows: string[];
	selectedRow: number;
	setSelectedSort: (row: number) => void;
	initialPrints: print[];
	setFilteredPrints: (prints: print[]) => void;
}

export default function FilterSort({
	rows,
	selectedRow,
	setSelectedSort,
	initialPrints,
	setFilteredPrints,
}: FilterSortProps) {
	function handleSort(rowIndex: number) {
		setSelectedSort(rowIndex);

		let sortedPrints = [...initialPrints];
		if (rowIndex === 0) {
			// Sort by Date
			sortedPrints.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);
		} else if (rowIndex === 1) {
			// Sort by Name
			sortedPrints.sort((a, b) => a.name.localeCompare(b.name));
		} else if (rowIndex === 2) {
			// Sort by Print Time
			sortedPrints.sort((a, b) => a.timeToPrint - b.timeToPrint);
		}

		setFilteredPrints(sortedPrints);
	}

	return (
		<Popover className="group min-w-64">
			<PopoverButton
				className="flex flex-row w-full border
					group-data-[open]:border-b-transparent group-data-[open]:rounded-b-none
					border-gray-700 rounded-lg items-center justify-between gap-1"
			>
				{selectedRow === -1 ? (
					<div className="p-2">Sort by</div>
				) : (
					<div className="p-2">{rows[selectedRow]}</div>
				)}
				<ChevronDownIcon
					className="align-bottom size-5 group-data-[open]:-rotate-180
						transition duration-100"
				/>
			</PopoverButton>
			
			<PopoverPanel
				aria-orientation="vertical"
				transition
				anchor="bottom"
				className="divide-y divide-white/5 rounded-b-lg bg-black/95
					text-sm/6 ease-in-out 
					[data-[closed]:-translate-y-1 data-[closed]:opacity-0
					border border-gray-700 w-64"
			>
				{({ close }) => (
					<>
						{selectedRow > -1 && (
							<div
								key="remove-filter"
								className="rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium"
								onClick={() => {
									setSelectedSort(-1);
									setFilteredPrints(initialPrints); // Reset to default
									close();
								}}
							>
								<div className="mt-2">Default</div>
							</div>
						)}
						{rows.map((row: string, index: number) => (
							<div
								key={index}
								className="rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium"
								onClick={() => {
									handleSort(index);
									close();
								}}
							>
								<div className="flex flex-row gap-4">
									<div className="mt-2">{row}</div>
								</div>
							</div>
						))}
					</>
				)}
			</PopoverPanel>
		</Popover>
	);
}
