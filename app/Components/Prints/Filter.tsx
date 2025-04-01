import { print } from "~/types/Print";
import { Printer } from "~/types/Printer";
import { Filament } from "~/types/Filament";
import { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";
import FilterSort from "./FilterSort";

interface FilterProps {
	initialPrints: print[];
	printers: Printer[];
	filaments: Filament[];
	setFilteredPrints: (prints: print[]) => void;
}

export default function Filter({
	initialPrints,
	setFilteredPrints,
	printers,
	filaments,
}: FilterProps) {
	const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
	const [selectedFil, setSelectedFil] = useState<Filament | null>(null);
	const [selectedRow, setSelectedRow] = useState(-1);
	const [sortDir, setSortDir] = useState(0); //0 for low to high (default) 1 for high to low
	const sortRows = ["Date", "Name", "Print time"];

	function applyFiltersAndSorting() {
		let filtered = [...initialPrints];

		if (selectedPrinter) {
			filtered = filtered.filter(
				(print) => print.printerUsed === selectedPrinter.id
			);
		}

		if (selectedFil) {
			filtered = filtered.filter((print) =>
				print.filamentsUsed.includes(selectedFil.id!)
			);
		}

		if (selectedRow === 0) {
			filtered.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);
		} else if (selectedRow === 1) {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (selectedRow === 2) {
			filtered.sort((a, b) => a.timeToPrint - b.timeToPrint);
		}
		if (sortDir) filtered.reverse();
		setFilteredPrints(filtered);
	}

	useEffect(() => {
		applyFiltersAndSorting();
	}, [selectedPrinter, selectedFil, selectedRow, sortDir]);

	return (
		<div className="p-4 rounded-lg flex flex-row gap-4">
			{/* Printer Filter */}
			<FilterSelect
				items={printers}
				selectedItem={selectedPrinter}
				setSelectedItem={setSelectedPrinter}
				label="Printer"
			/>

			{/* Filament Filter */}
			<FilterSelect
				items={filaments}
				selectedItem={selectedFil}
				setSelectedItem={setSelectedFil}
				label="Filament"
			/>

			{/* Sort */}
			<FilterSort
				rows={sortRows}
				selectedRow={selectedRow}
				setSelectedSort={setSelectedRow}
				initialPrints={initialPrints}
				setFilteredPrints={setFilteredPrints}
			/>
			{sortDir == 0 ? (
				<img
					className="border border-gray-700 rounded-lg w-10 h-10 invert hover:invert-0 cursor-pointer hover:bg-white"
					src="/sortUp.svg"
					alt="SortUp"
					onClick={() => {
						setSortDir(1);
					}}
				/>
			) : (
				<img
					className="border border-gray-700 rounded-lg w-10 h-10 invert hover:invert-0 cursor-pointer hover:bg-white"
					src="/sortDown.svg"
					alt="SortUp"
					onClick={() => {
						setSortDir(0);
					}}
				/>
			)}
		</div>
	);
}
