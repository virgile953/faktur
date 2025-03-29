import { FormEvent, useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import { Consumable, Printer, Upgrade } from "~/types/Printer";
import { Form } from "@remix-run/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PrinterDetails from "./printersPage/PrinterDetails";
import PrintersList from "./printersPage/PrintersList";
import NewPrinterForm from "./printersPage/NewPrinterForm";

<div className="relative group"></div>;

const data: Printer[] = [
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
		consumables: [
			{
				name: "Courroies axe y",
				lifeTime: 250,
				usedTime: 0,
				price: 50,
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
				price: 60,
			},
			{
				name: "Buse .1mm",
				lifeTime: 24,
				usedTime: 5,
				price: 74,
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
		consumables: [
			{
				name: "Courroies axe X",
				lifeTime: 250,
				usedTime: 0,
				price: 54,
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
				price: 66,
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
		consumables: [
			{
				name: "Courroies axe X",
				lifeTime: 250,
				usedTime: 0,
				price: 55,
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
				price: 68,
			},
		],
	},
];

function GenericTable<T>({
	data,
	headers,
	removeElement,
}: {
	data: T[];
	headers: { key: keyof T; label: string }[];
	removeElement: (item: T) => void;
}) {
	return (
		<table className="table-auto rounded-lg">
			<thead>
				<tr className="bg-gray-900">
					{headers.map((header, idx) => (
						<th key={idx} className="border px-4 py-2 ">
							{header.label}
						</th>
					))}
					<th className="border px-4">Remove</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr
						key={index}
						className={`border py-1 px-2 ${index % 2 ? "bg-gray-900/50" : ""}`}
					>
						{headers.map((header, idx) => (
							<td key={idx} className="border py-1 px-2">
								{String(item[header.key])}
							</td>
						))}
						<td className="border py-1 px-2 text-center">
							<button
								className="bg-red-900 text-white px-2 rounded "
								onClick={() => removeElement(item)}
							>
								X
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

const NewPrinter: Printer = {
	image: "",
	name: "",
	cost: 0,
	consumption: 0,
	upgrades: [],
	consumables: [],
};

const NewConsumable: Consumable = {
	lifeTime: 0,
	name: "",
	usedTime: 0,
	price: 0,
};

const NewUpgrade: Upgrade = {
	name: "",
	price: 0,
	installDate: "",
};

function Printers() {
	const [selectedPrinter, setSelectedPrinter] = useState(data[0]);
	const [newPrinter, setNewPrinter] = useState(NewPrinter);
	const [newConsumable, setNewConsumable] = useState(NewConsumable);
	const [newUpgrade, setNewUpgrade] = useState(NewUpgrade);

	function newPrinterAddConsumable(): void {
		const updatedConsumables = [...newPrinter.consumables];
		console.log(newPrinter.consumables);
		updatedConsumables.push(newConsumable);
		setNewPrinter({
			...newPrinter,
			consumables: updatedConsumables,
		});
		console.log(newPrinter.consumables);
	}

	function newPrinterRemoveConsumable(consumable: Consumable): void {
		const newConsumables = [...newPrinter.consumables].filter((elem) => {
			const isSameConsumable =
				elem.name === consumable.name &&
				elem.lifeTime === consumable.lifeTime &&
				elem.usedTime === consumable.usedTime;
			return !isSameConsumable;
		});

		setNewPrinter({
			...newPrinter,
			consumables: newConsumables,
		});
	}

	function newPrinterAddUpgrade(): void {
		const updatedUpgrades = [...newPrinter.upgrades];
		console.log(newPrinter.upgrades);
		updatedUpgrades.push(newUpgrade);
		setNewPrinter({
			...newPrinter,
			upgrades: updatedUpgrades,
		});
		console.log(newPrinter.upgrades);
	}

	function newPrinterRemoveUpgrade(upgrade: Upgrade): void {
		const newUpgrades = [...newPrinter.upgrades].filter((elem) => {
			const isSameUpgrade =
				elem.name === upgrade.name &&
				elem.installDate === upgrade.installDate &&
				elem.price === upgrade.price;
			return !isSameUpgrade;
		});

		setNewPrinter({
			...newPrinter,
			upgrades: newUpgrades,
		});
	}

	function createPrinter(): void {
		if (!newPrinter.name || !newPrinter.image || newPrinter.cost <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}
		console.log(newPrinter);
		// alert("Printer added successfully!");
	}
	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				{/* Affichage des imprimantes */}
				<PrintersList
					printers={data}
					selectedPrinter={selectedPrinter}
					onSelectPrinter={(printer) => setSelectedPrinter(printer)}
				/>
				{/* Affichage des infos de l'imprimante */}
				<PrinterDetails selectedPrinter={selectedPrinter} />

				{/* Ajout imprimante */}
				<NewPrinterForm
					newPrinter={newPrinter}
					setNewPrinter={setNewPrinter}
					newConsumable={newConsumable}
					setNewConsumable={setNewConsumable}
					newUpgrade={newUpgrade}
					setNewUpgrade={setNewUpgrade}
					newPrinterAddConsumable={newPrinterAddConsumable}
					newPrinterRemoveConsumable={newPrinterRemoveConsumable}
					newPrinterAddUpgrade={newPrinterAddUpgrade}
					newPrinterRemoveUpgrade={newPrinterRemoveUpgrade}
					createPrinter={createPrinter}
				/>
			</div>
		</>
	);
}

export default Printers;
function newPrinterBase(
	createPrinter: (event: FormEvent<HTMLFormElement>) => void,
	setNewPrinter: (printer: Printer) => void,
	newPrinter: Printer
) {
	return (
		<Form
			onSubmit={createPrinter}
			className="grid grid-cols-3 grid-flow-row w-full gap-6"
		>
			<div>
				<label
					className="flex flex-col text-xs gap-1 mb-2"
					htmlFor="printerName"
				>
					Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerName"
						onChange={(e) =>
							setNewPrinter({ ...newPrinter, name: e.target.value })
						}
					/>
				</label>

				<label
					className="flex flex-col text-xs gap-1 mb-2"
					htmlFor="printerCost"
				>
					Price
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerCost"
						type="number"
						onChange={(e) =>
							setNewPrinter({
								...newPrinter,
								cost: Number(e.target.value),
							})
						}
					/>
				</label>

				<label
					className="flex flex-col text-xs gap-1 mb-2"
					htmlFor="printerImage"
				>
					Image
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerImage"
						onChange={(e) =>
							setNewPrinter({
								...newPrinter,
								image: e.target.value,
							})
						}
					/>
				</label>
				<label
					className="flex flex-col text-xs gap-1 mb-2"
					htmlFor="printerConsumption"
				>
					Consumption (kw/h)
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						id="printerConsumption"
						type="number"
						onChange={(e) =>
							setNewPrinter({
								...newPrinter,
								cost: Number(e.target.value),
							})
						}
					/>
				</label>
			</div>
		</Form>
	);
}
