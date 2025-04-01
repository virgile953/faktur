import { print } from "~/types/Print";
import { Printer } from "~/types/Printer";
import { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";
import FilterSort from "./FilterSort";

interface FilterProps {
	initialPrints: print[];
	printers: Printer[];
	setFilteredPrints: (prints: print[]) => void;
}

export default function Filter({
	initialPrints,
	setFilteredPrints,
	printers,
}: FilterProps) {
	const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
	const [selectedRow, setSelectedRow] = useState(-1);
	const sortRows = ["Date", "Name", "Print time"];

	function handleFilterPrinter(printer: Printer | null) {
		if (!printer) {
			setFilteredPrints(initialPrints);
		} else {
			setFilteredPrints(
				initialPrints.filter((print) => print.printerUsed === printer.id)
			);
		}
	}

	useEffect(() => {
		handleFilterPrinter(selectedPrinter);
	}, [selectedPrinter]);

	return (
		<div className="p-4 rounded-lg flex flex-row gap-4">
			{/* Printer Filter */}
			<FilterSelect
				printers={printers}
				selectedPrinter={selectedPrinter}
				setSelectedPrinter={setSelectedPrinter}
			/>

			{/* Sort */}
			<FilterSort
				rows={sortRows}
				selectedRow={selectedRow}
				setSelectedSort={setSelectedRow}
				initialPrints={initialPrints}
				setFilteredPrints={setFilteredPrints}
			/>
		</div>
	);
}
