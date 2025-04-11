import { useEffect, useState } from "react";
import GenericTable from "./ui/GenericTable";
import { Printer } from "~/types/Printer";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Conso } from "~/types/conso";

type TableLine = {
	printerId: number;
	consoId?: number;
	printerName: string;
	filamentType: string;
	conso: number;
	consoStr: string;
};

let coucou: Conso[] = [
	{
		id: 0,
		printerId: 1,
		filamentType: "PETG",
		consoKw: 50,
	},
	{
		id: 1,
		printerId: 2,
		filamentType: "PLA",
		consoKw: 50,
	},
	{
		id: 2,
		printerId: 2,
		filamentType: "PPS-CF",
		consoKw: 112,
	},
];

export default function ElectricityConfig({
	filaments,
	printers,
	elecPrice,
}: {
	filaments: string[];
	printers: Printer[];
	elecPrice: number;
}) {
	const [tableData, setTableData] = useState<null | TableLine[]>(null);
	const [Data, setData] = useState<Conso[]>(coucou);

	const [selectedPrinter, setSelectedPrinter] = useState<Printer>(printers[0]);
	const [selectedFilament, setSelectedFilament] = useState(filaments[0]);
	const [conso, setConso] = useState(0);

	useEffect(() => {
		let data: TableLine[] = [];
		for (let i = 0; i < Data.length; i++) {
			const dataPrinter = printers.find((p) => p.id == Data[i].printerId)!;
			data.push({
				conso: Data[i].consoKw,
				consoId: Data[i].id,
				filamentType: Data[i].filamentType,
				printerId: dataPrinter.id!,
				printerName: dataPrinter.name,
				consoStr: Data[i].consoKw + " kw/h",
			});
		}
		setTableData(data);
	}, [Data]);

	return (
		<>
			<div
				className=" mt-[130px] p-4 w-full max-w-7xl mx-auto
			 flex flex-col  gap-8 items-center justify-center border border-gray-700 rounded-lg"
			>
				<div className="border border-gray-700 p-2 rounded-lg w-full flex flex-row gap-5 ">
					<label className="flex flex-col gap-0 items-start">
						<div className="text-gray-400 text-sm italic">Prix au kWh</div>
						<input
							className="p-2 bg-gray-900 rounded-lg w-32"
							type="number"
							step={0.0005}
							min={0}
							placeholder="0.1234"
							value={elecPrice}
							onChange={(e) => setConso(Number(e.target.value))}
						/>
					</label>
					<button
						className="px-2 bg-gray-900 rounded-lg w-20 h-[42px] place-self-end border border-gray-700 hover:border-white"
						onClick={() => {}}
					>
						Save
					</button>
				</div>
				<div className="flex flex-grow w-full">
					{tableData && (
						<GenericTable
							data={tableData}
							headers={[
								{ key: "printerName", label: "Printer" },
								{ key: "filamentType", label: "Material" },
								{ key: "consoStr", label: "Conso" },
							]}
							removeElement={(element) =>
								setData(
									Data.filter((data: Conso) => {
										if (data.id) return data.id != element.consoId;
										return !(
											data.consoKw == element.conso &&
											data.printerId == element.printerId &&
											data.filamentType == element.filamentType
										);
									})
								)
							}
							showRemoveButton
						/>
					)}
				</div>
				<div className="flex flex-row gap-5 w-full justify-between">
					<div className="flex flex-row gap-5">
						{printers && (
							<label className="flex flex-col gap-0 items-start">
								<div className="text-gray-400 text-sm italic">Printer:</div>
								<select
									className="p-2 bg-gray-900 rounded-lg"
									value={selectedPrinter.id}
									onChange={(e) => {
										setSelectedPrinter(
											printers.filter((p) => p.id == Number(e.target.value))[0]
										);
									}}
								>
									{printers.map((printer, idx) => (
										<option key={idx} value={printer.id}>
											{printer.name}
										</option>
									))}
								</select>
							</label>
						)}
						{filaments && (
							<label className="flex flex-col gap-0 items-start">
								<div className="text-gray-400 text-sm italic">Filament:</div>
								<select
									className="p-2 bg-gray-900 rounded-lg"
									value={selectedFilament}
									onChange={(e) => {
										setSelectedFilament(e.target.value);
									}}
								>
									{filaments.map((filament, idx) => (
										<option key={idx} value={filament}>
											{filament}
										</option>
									))}
								</select>
							</label>
						)}
						<label className="flex flex-col gap-0 items-start">
							<div className="text-gray-400 text-sm italic">Conso (kWh)</div>
							<input
								className="p-2 bg-gray-900 rounded-lg w-32"
								type="number"
								step={50}
								min={0}
								placeholder="8==D"
								onChange={(e) => setConso(Number(e.target.value))}
							/>
						</label>
						<button
							className="py-2 px-2 bg-gray-900 rounded-lg w-20  border border-gray-700 self-end
							hover:border-white"
							onClick={() => {
								// Validate inputs
								if (!conso || !selectedPrinter || !selectedFilament) {
									alert("Please fill in all fields before adding.");
									return;
								}

								const isDuplicate = tableData?.some(
									(tData) =>
										tData.filamentType === selectedFilament &&
										tData.printerId === selectedPrinter.id
								);

								if (isDuplicate) {
									alert("A line with the same data already exists!");
									return;
								}

								const newData = [
									...Data,
									{
										consoKw: conso,
										filamentType: selectedFilament,
										printerId: selectedPrinter.id!,
									},
								];
								setData(newData);
							}}
						>
							add
						</button>
					</div>
					<button
						className="px-2 bg-gray-900 rounded-lg w-20 h-[42px] place-self-end border border-gray-700 hover:border-white"
						onClick={() => {
							const areThereDuplicates = (): string | false => {
								for (const td of tableData || []) {
									const key = td.conso + td.filamentType + td.printerId;
									if (
										tableData!.filter(
											(tData) =>
												tData.filamentType + "||" + tData.printerId === key
										).length > 1
									) {
										return key;
									}
								}
								return false;
							};
							const dups = areThereDuplicates();
							if (dups) {
								alert("duplicates found");
								return;
							}
						}}
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
}
