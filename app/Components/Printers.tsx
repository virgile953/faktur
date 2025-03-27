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
			{
				name: "AMS filament changer",
				price: 300,
				installDate: "01/02/2025",
			},
			{
				name: "rgb leds for tuning",
				price: 12.45,
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
	{
		image: "https://img.staticdj.com/78b4b1a181b236e46e401c5efe4df976.jpg",
		name: "Creality ender 3",
		cost: 1800,
		consumption: 50,
		upgrades: [
			{
				name: "BLTouch Auto Bed Leveling Sensor",
				price: 69,
				installDate: "01/02/2025",
			},
			{
				name: "Y-Carriage Plate Upgrade",
				price: 75,
				installDate: "01/02/2025",
			},
			{
				name: "Adjustable Screen Mount for Ender 3 V2",
				price: 96.99,
				installDate: "01/02/2025",
			},
			{
				name: "Creality 3D Printer Enclosure",
				price: 80,
				installDate: "01/02/2025",
			},
			{
				name: "SD Card Extension Cable",
				price: 0.45,
				installDate: "01/02/2025",
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
				<div className="flex flex-row gap-0 overflow-x-auto relative w-full mx-5">
					{data.map((printer, index) => (
						<div
							key={index}
							className={`flex flex-row m-2 min-w-72 border border-gray-700 
							rounded-xl relative cursor-pointer
							${selectedPrinter == printer ? "bg-gray-900" : ""}`}
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
				<div className="grid grid-cols-3 justify-between m-4 rounded-xl border border-gray-700">
					{/* Printer details */}
					<div className="w-full p-2 col-span-2">
						<div className="flex flex-row justify-between mr-2">
							<div>{selectedPrinter.name}</div>
							<div>{selectedPrinter.cost + " €"}</div>
						</div>
						<ul className="p-2 text-xs">
							<h1 className="text-base">Liste des options:</h1>
							{selectedPrinter.upgrades.map((upgrade, index) => (
								<li
									key={index}
									className={`flex justify-between items-center hover:underline h-6
									${index % 2 == 1 ? "bg-gray-900" : ""}`}
								>
									<div className="flex flex-row">
										<div>{upgrade.installDate}</div>
										<div className="h-4 w-[1px] bg-blue-400 mx-2" />
										<div>{upgrade.name}</div>
									</div>
									<div>{upgrade.price + " €"}</div>
								</li>
							))}
						</ul>
					</div>
					{/* Printer image */}
					<img
						src={selectedPrinter.image}
						alt={selectedPrinter.name}
						className="h-full w-full rounded-r-xl object-cover col-span-1"
					/>
				</div>
			</div>
		</>
	);
}

export default Printers;
