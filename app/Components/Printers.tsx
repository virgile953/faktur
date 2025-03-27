import { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";

<div className="relative group"></div>;

const data = [
	{
		image:
			"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
		name: "Bambu-Lab X1Carbon",
		cost: 1800,
		consumption: 50,
		upgrades: [
			{
				name: "Nozzle Biqu Hotend Revo RapidChange",
				price: 150,
				installDate: "01/02/2025",
			},
			{
				name: "2 x Rapid Change nozzle",
				price: 75,
				installDate: "01/02/2025",
			},
		],
	},
	{
		image: "https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
		name: "Mars 3 Pro",
		cost: 300,
		consumption: 50,
		upgrades: [
			{
				name: "Jacuzzy mode with bubbles",
				price: 45,
				installDate: "20/04/2025",
			},
		],
	},
	// {
	// 	image:
	// 		"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
	// 	name: "Bambu-Lab X1Carbon",
	// 	cost: 1800,
	// 	consumption: 50,
	// 	upgrades: [
	// 		{
	// 			name: "Nozzle Biqu Hotend Revo RapidChange",
	// 			price: 150,
	// 			installDate: "01/02/2025",
	// 		},
	// 		{
	// 			name: "2 x Rapid Change nozzle",
	// 			price: 75,
	// 			installDate: "01/02/2025",
	// 		},
	// 	],
	// },
	// {
	// 	image:
	// 		"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
	// 	name: "Bambu-Lab X1Carbon",
	// 	cost: 1800,
	// 	consumption: 50,
	// 	upgrades: [
	// 		{
	// 			name: "Nozzle Biqu Hotend Revo RapidChange",
	// 			price: 150,
	// 			installDate: "01/02/2025",
	// 		},
	// 		{
	// 			name: "2 x Rapid Change nozzle",
	// 			price: 75,
	// 			installDate: "01/02/2025",
	// 		},
	// 	],
	// },
	// {
	// 	image:
	// 		"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
	// 	name: "Bambu-Lab X1Carbon",
	// 	cost: 1800,
	// 	consumption: 50,
	// 	upgrades: [
	// 		{
	// 			name: "Nozzle Biqu Hotend Revo RapidChange",
	// 			price: 150,
	// 			installDate: "01/02/2025",
	// 		},
	// 		{
	// 			name: "2 x Rapid Change nozzle",
	// 			price: 75,
	// 			installDate: "01/02/2025",
	// 		},
	// 	],
	// },
	// {
	// 	image: "https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
	// 	name: "Mars 3 Pro",
	// 	cost: 300,
	// 	consumption: 50,
	// 	upgrades: [
	// 		{
	// 			name: "Jacuzzy mode with bubbles",
	// 			price: 45,
	// 			installDate: "20/04/2025",
	// 		},
	// 	],
	// },
	// {
	// 	image: "https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
	// 	name: "Mars 3 Pro",
	// 	cost: 300,
	// 	consumption: 50,
	// 	upgrades: [
	// 		{
	// 			name: "Jacuzzy mode with bubbles",
	// 			price: 45,
	// 			installDate: "20/04/2025",
	// 		},
	// 	],
	// },
];

function Printers() {
	const [selectedPrinter, setSelectedPrinter] = useState(data[0]);

	useEffect(() => {
		console.log(selectedPrinter);
	}, [selectedPrinter]);

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				{/* Affichage des imprimantes */}
				<div className="flex flex-row gap-0 overflow-x-auto relative">
					{data.map((printer, index) => (
						<div
							key={index}
							className="flex flex-row m-2 min-w-72 border border-gray-700 rounded-xl relative cursor-pointer"
							onClick={() => setSelectedPrinter(data[index])}
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
				{/* Affichage des infos de l'imprimante */}
				<div className="flex flex-col p-4">
					<div>{selectedPrinter.name}</div>
					<ul className="list-inside list-disc">
						{selectedPrinter.upgrades.map((upgrade, index) => (
							<li key={index}>{upgrade.name}</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Printers;
