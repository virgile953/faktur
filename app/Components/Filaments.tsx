import { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import FilamentsList from "./filamentsPage/FilamentsList";
import FilamentDetails from "./filamentsPage/FilamentDetails";
import { Filament } from "~/types/Filament";

const data: Filament[] = [
	{
		image:
			"https://eu.store.bambulab.com/cdn/shop/files/JP34951_dfb10fec-368d-47a7-8bd8-bb506498a9bd_600x.jpg?v=1705040347",
		name: "PETG Translucent",
		material: "PETG",
		brand: "Bambu lab",
		description:
			"Known for its impact and water resistance, high flexibility and strong adhesion to the coating, Bambu PETG Basic is ideal for printing tools (vices, turnbuckles, bag clips), toys (Frisbees, boomerangs), water containers (bottles, watering cans) and outdoor items (flower pots, bottle cages) that require long-term exposure and are impact resistant.",
		price: 23.28,
		quantity: 1000,
		// hehe titty
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

const NewFilament: Filament = {
	id: undefined,
	brand: "",
	color: "",
	description: "",
	image: "",
	material: "",
	name: "",
	price: 0,
	quantity: 0,
	unit: "",
};

function Filaments() {
	const [selectedFilament, setSelectedFilament] = useState(data[0]);
	const [newFilament, setNewFilament] = useState(NewFilament);

	useEffect(() => {
		console.log(selectedFilament);
	}, [selectedFilament]);

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)] ">
				{/* Affichage des filaments */}
				<FilamentsList
					data={data}
					selectedFilament={selectedFilament}
					setSelectedFilament={setSelectedFilament}
				/>
				{/* Affichage des infos du filament */}
				<FilamentDetails selectedFilament={selectedFilament} />
				{/* Create or update a filament */}
				<div className="grid grid-cols-3 border border-red-700 rounded-lg max-w-7xl mx-auto p-2 ">
					<div className="col-span-2">
						<h1 className="text-xl mb-4">
							{newFilament.id == undefined ? "Add" : "Update"} a filament
						</h1>
						<label className="flex flex-col gap-1 mb-2">
							Filament name
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.name || ""}
								onChange={(e) =>
									setNewFilament({ ...newFilament, name: e.target.value })
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament brand
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.brand || ""}
								onChange={(e) =>
									setNewFilament({ ...newFilament, brand: e.target.value })
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament color
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.color || ""}
								onChange={(e) =>
									setNewFilament({ ...newFilament, color: e.target.value })
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament description
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.description || ""}
								onChange={(e) =>
									setNewFilament({
										...newFilament,
										description: e.target.value,
									})
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament material
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.material || ""}
								onChange={(e) =>
									setNewFilament({ ...newFilament, material: e.target.value })
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament quantity
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.quantity || ""}
								onChange={(e) =>
									setNewFilament({
										...newFilament,
										quantity: Number(e.target.value),
									})
								}
							/>
						</label>
						<label className="flex flex-col gap-1 mb-2">
							Filament unit
							<input
								className="bg-gray-900 rounded-lg pl-2 p-1"
								value={newFilament.unit || ""}
								onChange={(e) =>
									setNewFilament({ ...newFilament, unit: e.target.value })
								}
							/>
						</label>
					</div>
					{/* Image preview */}
					<div className="justify-self-end w-full h-full">
						{newFilament.image ? (
							<img
								src={newFilament.image}
								alt="Printer preview"
								className="h-full w-full rounded-r-xl object-cover border border-gray-700"
							/>
						) : (
							<div className="h-full w-full rounded-r-xl border border-gray-700 flex items-center justify-center text-gray-500">
								Filament image preview
							</div>
						)}
					</div>
				</div>
				coucou coucou
				<br />
				coucou
				<br />
				coucou
				<br />
				coucou
				<br />
				coucou
			</div>
		</>
	);
}

export default Filaments;
