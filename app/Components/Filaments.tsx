import { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import { Description } from "@headlessui/react";

<div className="relative group"></div>;

const data = [
	{
		image:
			"https://eu.store.bambulab.com/cdn/shop/files/JP34951_dfb10fec-368d-47a7-8bd8-bb506498a9bd_600x.jpg?v=1705040347",
		name: "PETG Translucent",
		material: "PETG",
		brand: "Bambu lab",
		description:
			"Known for its impact and water resistance, high flexibility and strong adhesion to the coating, Bambu PETG Basic is ideal for printing tools (vices, turnbuckles, bag clips), toys (Frisbees, boomerangs), water containers (bottles, watering cans) and outdoor items (flower pots, bottle cages) that require long-term exposure and are impact resistant.",
		price: 23.28,
		quantity: 1000, // hehe titty
		unit: "gr",
		color: "bleu",
	},
	{
		image:
			"https://cdn-3.makershop.fr/11790-thickbox_default/esun-epla-silk.jpg?_gl=1*36l2xu*_gcl_au*MTA5MDYyODIyNi4xNzQzMDkwMjI2",
		name: "eSun ePLA Silk",
		material: "PLA",
		brand: "eSun",
		description: `Le filament 3D eSun ePLA Silk est une version améliorée du PLA standard, intégrant des matériaux à effet brillant qui donnent une surface de finition brillante et soyeuse. Il conserve les avantages du PLA, avec une bonne propriété mécanique et une haute résistance. Disponible en bobine de 1kg et en diamètre de 1.75 mm.`,
		price: 19.16,
		quantity: 1000,
		unit: "gr",
		color: "metallic gray",
	},
	{
		image:
			"https://eu.store.bambulab.com/cdn/shop/files/Mainimage_800x800.png?v=1724636050",
		name: "Black noir high heat",
		material: "PPS-CF",
		brand: "Bambu lab",
		description: `Product Features
										- Ultra-High Heat Resistance
										- Top-tier Flame Retardancy
										- Peerless Mechanical Properties
										- Solvent and Chemical Resistance
										- Ultra-Low Water Absorption
										- Comes with Cardboard Spool
										- Diameter: 1.75 mm +/- 0.05 mm`,
		price: 135.12,
		quantity: 1000,
		unit: "gr",
		color: "black",
	},
];

function Filaments() {
	const [selectedFilament, setSelectedFilament] = useState(data[0]);

	useEffect(() => {
		console.log(selectedFilament);
	}, [selectedFilament]);

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				{/* Affichage des imprimantes */}
				<div className="flex flex-row gap-0 overflow-x-auto relative w-full mx-5">
					{data.map((filament, index) => (
						<div
							key={index}
							className={`flex flex-row m-2 min-w-72 border border-gray-700 
							rounded-xl relative cursor-pointer
							${selectedFilament == filament ? "bg-gray-900" : ""}`}
							onClick={() => setSelectedFilament(data[index])}
						>
							<img
								src={filament.image}
								className="h-24 w-24 rounded-s-xl"
								alt={filament.name}
							/>
							<div className="flex flex-col p-2 text-sm justify-between relative w-full overflow-hidden">
								<div className="absolute top-0 right-0 text-xs font-bold px-2 py-1 border-l border-b border-gray-700 rounded-bl">
									{filament.price + " €"}
								</div>
								<div className="flex flex-col">
									<div>{filament.brand}</div>
									<div>{filament.material}</div>
									<div>{filament.name}</div>
								</div>
								<div className="text-xs">{"coucou" + " Options"}</div>
							</div>
						</div>
					))}
				</div>
				{/* Affichage des infos de l'imprimante */}
				<div className="grid grid-cols-3 justify-between m-4 rounded-xl border border-gray-700">
					{/* Printer details */}
					<div className="w-full p-2 col-span-2">
						<div className="flex flex-row justify-between mr-2">
							<div>{selectedFilament.name}</div>
							<div>{selectedFilament.price + " €"}</div>
						</div>
						<ul className="p-2 text-xs">
							<h1 className="text-base text-justify">Description:</h1>
							{selectedFilament.description}
						</ul>
					</div>
					{/* Printer image */}
					<img
						src={selectedFilament.image}
						alt={selectedFilament.name}
						className="h-full w-full rounded-r-xl object-cover col-span-1"
					/>
				</div>
			</div>
		</>
	);
}

export default Filaments;
