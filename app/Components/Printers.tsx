import { FormEvent, useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import { Consumable, Printer } from "~/types/Printer";
import { Form } from "@remix-run/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

<div className="relative group"></div>;

const data: Printer[] = [
	{
		image:
			"https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
		name: "Bambu-Lab X1Carbon",
		cost: 1800,
		consumption: 50,
		updgrades: [
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
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
			},
			{
				name: "Buse .1mm",
				lifeTime: 24,
				usedTime: 5,
			},
		],
	},
	{
		image: "https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
		name: "Mars 3 Pro",
		cost: 300,
		consumption: 50,
		updgrades: [
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
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
			},
		],
	},
	{
		image: "https://img.staticdj.com/78b4b1a181b236e46e401c5efe4df976.jpg",
		name: "Creality ender 3",
		cost: 1800,
		consumption: 50,
		updgrades: [
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
			},
			{
				name: "plaque chauffante",
				lifeTime: 50,
				usedTime: 0,
			},
		],
	},
];

const NewPrinter: Printer = {
	image: "",
	name: "",
	cost: 0,
	consumption: 0,
	updgrades: [],
	consumables: [],
};

const NewConsumable: Consumable = {
	lifeTime: 0,
	name: "",
	usedTime: 0,
};

function Printers() {
	const [selectedPrinter, setSelectedPrinter] = useState(data[0]);
	const [newPrinter, setNewPrinter] = useState(NewPrinter);
	const [newConsumable, setNewConsumable] = useState(NewConsumable);
	function newPrinterAddConsumable(consumable: Consumable): void {
		const updatedConsumables = [...newPrinter.consumables];
		updatedConsumables.push(consumable);
		setNewPrinter({
			...newPrinter,
			consumables: updatedConsumables,
		});
	}
	function newPrinterRemoveConsumable(consumable: Consumable): void {
		const newConsumables = [...newPrinter.consumables].filter(
			(elem) =>
				elem.name != consumable.name &&
				elem.lifeTime != consumable.lifeTime &&
				elem.usedTime != consumable.usedTime
		);

		setNewPrinter({
			...newPrinter,
			consumables: newConsumables,
		});
	}

	function createPrinter(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		if (!newPrinter.name || !newPrinter.image || newPrinter.cost <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}
		// data.push({ ...newPrinter });
		// setNewPrinter(NewPrinter);
		console.log(newPrinter);
		alert("Printer added successfully!");
	}
	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				{/* Affichage des imprimantes */}
				<div className="flex flex-row gap-0 overflow-x-auto relative mx-5">
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
										{printer.updgrades.length + " Options"}
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
							{selectedPrinter.updgrades.map((upgrade, index) => (
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
				{/* Ajout imprimante */}
				<div className="justify-between m-4 min-h-max rounded-xl border border-gray-700 p-2">
					<h1 className="mb-4">Ajouter une imprimante</h1>
					<TabGroup className="ml-4">
						<TabList className="mb-4">
							<Tab className="py-2 px-4 data-[selected]:bg-gray-900 rounded-lg">
								Base infos
							</Tab>
							<Tab className="py-2 px-4 data-[selected]:bg-gray-900 rounded-lg">
								Consumables
							</Tab>
							<Tab className="py-2 px-4 data-[selected]:bg-gray-900 rounded-lg">
								Options
							</Tab>
						</TabList>
						<TabPanels className="ml-4">
							<TabPanel className="">
								{newPrinterBase(createPrinter, setNewPrinter, newPrinter)}
							</TabPanel>
							<TabPanel>
								<label className="flex flex-col text-base gap-1 mb-2">
									Name of consumable
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1 w-56"
										onChange={(e) =>
											setNewConsumable({
												...newConsumable,
												name: e.target.value,
											})
										}
									/>
								</label>
								<label className="flex flex-col text-base gap-1 mb-2">
									Expected lifetime
									<div>
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-20"
											type="number"
											dir="rtl"
											onChange={(e) =>
												setNewConsumable({
													...newConsumable,
													lifeTime: Number(e.target.value),
												})
											}
										/>
										{" H"}
									</div>
								</label>
								<label className="flex flex-col text-base gap-1 mb-2">
									used time
									<div>
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-20"
											type="number"
											dir="rtl"
											onChange={(e) =>
												setNewConsumable({
													...newConsumable,
													usedTime: Number(e.target.value),
												})
											}
										/>
										{" H"}
									</div>
								</label>
								<button
									className="py-2 px-4 bg-gray-900 rounded-lg border"
									onClick={() => newPrinterAddConsumable}
								>
									Ajouter
								</button>
							</TabPanel>
							<TabPanel>Content 3</TabPanel>
						</TabPanels>
					</TabGroup>

					{/* Table to show new consumables*/}
					{/* <div>
								{newPrinter.consumables.map((consumable, index) => (
									<div className="flex flex-row">
										<div key={index}>{consumable.name}</div>
										<div key={index}>{consumable.usedTime}</div>
										<div key={index}>{consumable.lifeTime}</div>
									</div>
								))}
								Add new consumable
								<div>
									<label className="flex flex-col text-xs gap-1 mb-2">
										Name of consumable
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1"
											onChange={(e) =>
												setNewPrinter({
													...newPrinter,
													consumables: [
														...newPrinter.consumables,
														{ name: e.target.value, lifeTime: 0, usedTime: 0 },
													],
												})
											}
										/>
									</label>
									<label className="flex flex-col text-xs gap-1 mb-2">
										Expected lifetime
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1"
											type="number"
											onChange={(e) => {
												const updatedConsumables = [...newPrinter.consumables];
												const lastConsumable = updatedConsumables.pop();
												if (lastConsumable) {
													updatedConsumables.push({
														...lastConsumable,
														lifeTime: Number(e.target.value),
													});
												}
												setNewPrinter({
													...newPrinter,
													consumables: updatedConsumables,
												});
											}}
										/>
									</label>
								</div>
							</div> */}
					{/* Table  to add Options */}

					<button
						className=" bg-gradient-to-t from-gray-900 to-gray-800 m-2 p-2  px-4 rounded-lg border"
						type="submit"
					>
						{newPrinter.id == undefined ? "Create " : "Update"}
					</button>
				</div>
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
