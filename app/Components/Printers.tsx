import { useState } from "react";
import Navbar from "./ui/Navbar";
import { Consumable, Printer, Upgrade } from "~/types/Printer";
import PrinterDetails from "./printersPage/PrinterDetails";
import PrintersList from "./printersPage/PrintersList";
import NewPrinterForm from "./printersPage/newPrinter/NewPrinterForm";
import { useSubmit } from "@remix-run/react";

const NewPrinter: Printer = {
	image: "",
	name: "",
	price: 0,
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

function Printers({ initialPrinters }: { initialPrinters: Printer[] }) {
	const [printers, setPrinters] = useState(initialPrinters);
	const [selectedPrinter, setSelectedPrinter] = useState(initialPrinters[0]);
	const [newPrinter, setNewPrinter] = useState(NewPrinter);
	const [newConsumable, setNewConsumable] = useState(NewConsumable);
	const [newUpgrade, setNewUpgrade] = useState(NewUpgrade);

	const submit = useSubmit();
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
				elem.price === consumable.price &&
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
		if (!newPrinter.name || !newPrinter.image || newPrinter.price <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}

		// Submit to the server
		submit(
			{ printerData: JSON.stringify(newPrinter), _action: "create" },
			{ method: "post", encType: "multipart/form-data" }
		);

		// Add to local state (you might want to replace this with a redirect or refetch)
		setPrinters([...printers, { ...newPrinter, id: Date.now() }]);
		setNewPrinter(NewPrinter);
	}

	function updatePrinter(): void {
		if (!newPrinter.name || !newPrinter.image || newPrinter.price <= 0) {
			console.log("Please fill in all required fields with valid values.");
			return;
		}
		submit(
			{ printerData: JSON.stringify(newPrinter), _action: "update" },
			{ method: "put", encType: "multipart/form-data" }
		);

		setNewPrinter(NewPrinter);
		setTimeout(() => window.location.reload(), 10); // To ensure the data is actually written to the db before reloadingssssssss
	}

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				{/* Affichage des imprimantes */}
				<PrintersList
					printers={printers}
					selectedPrinter={selectedPrinter}
					onSelectPrinter={(printer) => setSelectedPrinter(printer)}
				/>
				{/* Affichage des infos de l'imprimante */}
				<PrinterDetails
					selectedPrinter={selectedPrinter}
					setNewPrinter={setNewPrinter}
				/>

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
					updatePrinter={updatePrinter}
				/>
			</div>
		</>
	);
}

export default Printers;
