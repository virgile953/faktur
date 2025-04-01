import { Filament } from "~/types/Filament";
import Navbar from "./ui/Navbar";
import { Printer } from "~/types/Printer";
import { useEffect } from "react";
import Print from "./Prints/print";
import { print } from "../types/Print";

const data: print[] = [
	{
		id: 1,
		name: "Benchy",
		date: "01/02/2025",
		printerUsed: 1,
		filamentsUsed: [2],
		client: 1,
		filamentQuantity: 40,
		image: "/3DBenchy.png",
		file: "",
		timeToPrint: 50, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 2,
		name: "pikachu",
		date: "05/03/2024",
		printerUsed: 2,
		filamentsUsed: [3, 2, 1],
		client: 2,
		filamentQuantity: 113,
		image: "/plate_1.png",
		file: "",
		timeToPrint: 345, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 3,
		name: "Plop",
		date: "05/03/2024",
		printerUsed: 2,
		filamentsUsed: [3],
		client: 2,
		filamentQuantity: 113,
		image: "",
		file: "",
		timeToPrint: 345, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 4,
		name: "Carapute",
		date: "05/03/2024",
		printerUsed: 2,
		filamentsUsed: [3],
		client: 2,
		filamentQuantity: 113,
		image: "",
		file: "",
		timeToPrint: 345, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 5,
		name: "Boeing 747",
		date: "05/03/2024",
		printerUsed: 2,
		filamentsUsed: [3],
		client: 2,
		filamentQuantity: 113,
		file: "",
		image: "",
		timeToPrint: 345, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 6,
		name: "Dell XPS13 pro plus",
		date: "05/03/2024",
		printerUsed: 2,
		filamentsUsed: [3],
		client: 2,
		filamentQuantity: 113,
		image: "",
		file: "",
		timeToPrint: 345, // in minutes
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
];

export default function Prints({
	Filaments,
	Printers,
}: {
	Filaments: Filament[];
	Printers: Printer[];
}) {
	useEffect(() => {
		// console.log(Printers);
		// console.log(Filaments);
	});
	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4">
				<div className="bg-gray-800 p-4 rounded-lg flex flex-row flex-wrap gap-2">
					{/* <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-5 grid-rows-4 gap-4"> */}
					{data.map((coucou, idx) => {
						return (
							<div key={idx} className="basis-64 grow">
								<Print
									Item={coucou}
									Filaments={Filaments.filter((f) => {
										return (
											f?.id !== undefined && coucou.filamentsUsed.includes(f.id)
										);
									})}
									Printer={
										Printers.filter((p) => (p.id = coucou.printerUsed))[0]
									}
								/>
							</div>
						);
					})}{" "}
				</div>
			</div>
		</>
	);
}
