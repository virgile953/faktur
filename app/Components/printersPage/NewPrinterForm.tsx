import { Consumable, Printer, Upgrade } from "~/types/Printer";
import { Form } from "@remix-run/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GenericTable from "~/Components/ui/GenericTable";

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
}

// Base information form
function NewPrinterBase({
	setNewPrinter,
	newPrinter,
}: {
	setNewPrinter: (printer: Printer) => void;
	newPrinter: Printer;
}) {
	return (
		<Form className="grid grid-cols-3 grid-flow-row w-full gap-6">
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
								consumption: Number(e.target.value),
							})
						}
					/>
				</label>
			</div>
		</Form>
	);
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
								<div className="w-1/2">
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
											value={newConsumable.usedTime}
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
								<GenericTable
									data={newPrinter.upgrades}
									headers={[
										{ key: "name", label: "Name" },
										{ key: "price", label: "Price" },
										{ key: "installDate", label: "Date of install" },
									]}
									removeElement={newPrinterRemoveUpgrade}
								/>
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
				onClick={createPrinter}
			>
				{newPrinter.id == undefined ? "Create " : "Update"}
			</button>
		</div>
	);
}
