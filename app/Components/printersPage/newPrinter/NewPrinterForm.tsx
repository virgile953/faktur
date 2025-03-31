import { Consumable, Printer, Upgrade } from "~/types/Printer";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GenericTable from "~/Components/ui/GenericTable";
import NewPrinterBase from "./BaseInfos";
import { updatePrinter } from "~/db/printers.server";

interface NewPrinterFormProps {
	newPrinter: Printer;
	setNewPrinter: (printer: Printer) => void;
	newConsumable: Consumable;
	setNewConsumable: (consumable: Consumable) => void;
	newUpgrade: Upgrade;
	setNewUpgrade: (upgrade: Upgrade) => void;
	newPrinterAddConsumable: () => void;
	newPrinterRemoveConsumable: (consumable: Consumable) => void;
	newPrinterAddUpgrade: () => void;
	newPrinterRemoveUpgrade: (upgrade: Upgrade) => void;
	createPrinter: () => void;
	updatePrinter: () => void;
}

export default function NewPrinterForm({
	newPrinter,
	setNewPrinter,
	newConsumable,
	setNewConsumable,
	newUpgrade,
	setNewUpgrade,
	newPrinterAddConsumable,
	newPrinterRemoveConsumable,
	newPrinterAddUpgrade,
	newPrinterRemoveUpgrade,
	createPrinter,
	updatePrinter,
}: NewPrinterFormProps) {
	return (
		<div className="max-w-7xl mx-auto justify-between m-4 min-h-max rounded-xl border border-gray-700 p-2">
			<h1 className="mb-2">Ajouter une imprimante</h1>
			<TabGroup className="ml-4 border border-gray-700 rounded-lg my-6 p-2 pb-6 ">
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
						<NewPrinterBase
							setNewPrinter={setNewPrinter}
							newPrinter={newPrinter}
						/>
					</TabPanel>
					<TabPanel>
						<div className="flex flex-row gap-4">
							{newPrinter.consumables.length ? (
								<div className="w-full h-full overflow-y-auto max-h-80">
									<GenericTable
										data={newPrinter.consumables}
										headers={[
											{ key: "name", label: "Name" },
											{ key: "lifeTime", label: "Expected lifetime" },
											{ key: "usedTime", label: "Time of use" },
										]}
										removeElement={newPrinterRemoveConsumable}
									/>
								</div>
							) : (
								<div className="text-center text-3xl w-full">
									<br />
									<br />
									no consumables
								</div>
							)}

							<div className="w-56">
								<label className="flex flex-col gap-1 mb-2">
									Name of consumable
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
										value={newConsumable.name}
										onChange={(e) =>
											setNewConsumable({
												...newConsumable,
												name: e.target.value,
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1 mb-2">
									Expected lifetime
									<div className="flex flex-row items-center">
										<input
											className="bg-gray-900 rounded-lg pl-2 py-1 w-full text-right"
											type="number"
											value={newConsumable.lifeTime}
											onChange={(e) =>
												setNewConsumable({
													...newConsumable,
													lifeTime: Number(e.target.value),
												})
											}
										/>
										<span className="ml-2">H</span>
									</div>
								</label>
								<label className="flex flex-col gap-1 mb-2">
									Used time
									<div className="flex flex-row items-center">
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
											type="number"
											value={newConsumable.usedTime}
											onChange={(e) =>
												setNewConsumable({
													...newConsumable,
													usedTime: Number(e.target.value),
												})
											}
										/>
										<span className="ml-2">H</span>
									</div>
								</label>
								<label className="flex flex-col gap-1 mb-2">
									Price
									<div className="flex flex-row items-center">
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
											type="number"
											value={newConsumable.price}
											onChange={(e) =>
												setNewConsumable({
													...newConsumable,
													price: Number(e.target.value),
												})
											}
										/>
										<span className="ml-2">€</span>
									</div>
								</label>
								<button
									className="py-2 px-4 bg-gray-900 rounded-lg border w-full mt-2"
									onClick={newPrinterAddConsumable}
								>
									Ajouter
								</button>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="flex flex-row gap-4">
							{newPrinter.upgrades.length ? (
								<div className="w-full max-h-72 overflow-y-auto">
									<GenericTable
										data={newPrinter.upgrades}
										headers={[
											{ key: "name", label: "Name" },
											{ key: "price", label: "Price" },
											{ key: "installDate", label: "Date of install" },
										]}
										removeElement={newPrinterRemoveUpgrade}
									/>
								</div>
							) : (
								<div className="text-center text-3xl w-full">
									<br />
									<br />
									no upgrades
								</div>
							)}

							<div className="w-56">
								<label className="flex flex-col gap-1 mb-2">
									Name of upgrade
									<input
										className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
										onChange={(e) =>
											setNewUpgrade({
												...newUpgrade,
												name: e.target.value,
											})
										}
									/>
								</label>
								<label className="flex flex-col gap-1 mb-2">
									Price
									<div className="flex flex-row items-center">
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
											type="number"
											onChange={(e) =>
												setNewUpgrade({
													...newUpgrade,
													price: Number(e.target.value),
												})
											}
										/>
										<span className="ml-2">€</span>
									</div>
								</label>
								<label className="flex flex-col gap-1 mb-2">
									Install date
									<div>
										<input
											className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
											type="date"
											dir="rtl"
											onChange={(e) =>
												setNewUpgrade({
													...newUpgrade,
													installDate: e.target.value,
												})
											}
										/>
									</div>
								</label>
								<button
									className="py-2 px-4 bg-gray-900 rounded-lg border w-full mt-2"
									onClick={newPrinterAddUpgrade}
								>
									Ajouter
								</button>
							</div>
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>

			<button
				className="bg-gradient-to-t from-gray-900 to-gray-800 m-2 p-2 px-4 rounded-lg border"
				onClick={newPrinter.id == undefined ? createPrinter : updatePrinter}
			>
				{newPrinter.id == undefined ? "Create " : "Update"}
			</button>
		</div>
	);
}
