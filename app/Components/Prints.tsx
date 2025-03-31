import { Filament } from "~/types/Filament";
import Navbar from "./ui/Navbar";
import { Printer } from "~/types/Printer";
import { useEffect } from "react";

const data = [
	{
		id: 1,
		date: "01/02/2025",
		printerUsed: 1,
		filamentUsed: 2,
		client: 1,
		filamentQuantity: 40,
		timeToPrint: 50, // in minutes
		margin: 22.5, // percentage to add to total
		usedUpgrades: [66, 67],
		usedConsumables: [63, 64, 65],
	},
	{
		id: 2,
		date: "05/03/2024",
		printerUsed: 2,
		filamentUsed: 3,
		client: 2,
		filamentQuantity: 113,
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

	useEffect(() =>
	{
		console.log(Printers);
		console.log(Filaments);
	})
	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4">
				<div className="bg-gray-800 p-4 rounded-lg"> coucou </div>
			</div>
		</>
	);
}
