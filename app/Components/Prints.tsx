import { useState } from "react";
import { Filament } from "~/types/Filament";
import { Printer } from "~/types/Printer";
import { print } from "~/types/Print";
import Print from "./Prints/print";
import Filter from "./Prints/Filter";
import { Link } from "@remix-run/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Conso } from "~/types/conso";

export default function Prints({
	initialPrints,
	Filaments,
	Printers,
	consos,
	elecPrice,
}: {
	initialPrints: print[];
	Filaments: Filament[];
	Printers: Printer[];
	consos: Conso[];
	elecPrice: number;
}) {
	const [filteredPrints, setFilteredPrints] = useState(initialPrints);

	return (
		<>
			<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4">
				{/* Filter and Sort UI */}
				<Filter
					initialPrints={initialPrints}
					setFilteredPrints={setFilteredPrints}
					printers={Printers}
					filaments={Filaments}
				/>

				{/* List all the prints */}
				<div className="p-4 rounded-t-lg flex flex-row flex-wrap gap-2">
					{filteredPrints.map((print, idx) => {
						const printerConsos = consos.filter(
							(conso) => conso.printerId === print.printerUsed
						);

						const filamentsUsed = Filaments.filter((f) => {
							return f?.id !== undefined && print.filamentsUsed.includes(f.id);
						});

						const usedConsos = printerConsos.filter((conso) => {
							return filamentsUsed.some(
								(filament) => filament.material === conso.filamentType
							);
						});

						return (
							<div key={idx} className="basis-64 grow">
								<Print
									Item={print}
									Filaments={filamentsUsed}
									Printer={
										Printers.filter((p) => p.id === print.printerUsed)[0]
									}
									consos={usedConsos}
									elecPrice={elecPrice}
								/>
							</div>
						);
					})}
				</div>
				<div className="border border-gray-700 rounded-lg px-4 py-2 mx-4 -my-4 w-fit">
					{filteredPrints.length} items
				</div>
				<Link
					className="block my-16 mr-10 ml-auto w-fit rounded-full"
					to={"new"}
				>
					<PlusCircleIcon height={72} color="#4a92ff" />
				</Link>
			</div>
		</>
	);
}
