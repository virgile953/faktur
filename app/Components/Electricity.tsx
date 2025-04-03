import { useEffect, useState } from "react";
import GenericTable from "./ui/GenericTable";
import { data } from "@remix-run/react";
import { Printer } from "~/types/Printer";

type TableLine = {
	printerId: number;
	consoId: number;
	printerName: string;
	filamentMaterial: string;
	conso: number;
	consoStr: string;
};

type InputData = {
	id: number;
	printerId: number;
	filamentMaterial: string;
	consumtion: number;
};

let coucou: InputData[] = [
	{
		id: 0,
		printerId: 1,
		filamentMaterial: "PETG",
		consumtion: 50,
	},
	{
		id: 1,
		printerId: 2,
		filamentMaterial: "PLA",
		consumtion: 50,
	},
	{
		id: 2,
		printerId: 2,
		filamentMaterial: "PPS-CF",
		consumtion: 112,
	},
];

export default function ElectricityConfig({
	filaments,
	printers,
}: {
	filaments: string[];
	printers: Printer[];
}) {
	const [tableData, setTableData] = useState<null | TableLine[]>(null);
	const [Data, setData] = useState<InputData[]>(coucou);
	useEffect(() => {
		let data: TableLine[] = [];
		for (let i = 0; i < Data.length; i++) {
			const dataPrinter = printers.find((p) => p.id == Data[i].printerId)!;
			data.push({
				conso: Data[i].consumtion,
				consoId: Data[i].id,
				filamentMaterial: Data[i].filamentMaterial,
				printerId: dataPrinter.id!,
				printerName: dataPrinter.name,
				consoStr: Data[i].consumtion + " kw/h",
			});
		}
		setTableData(data);
		console.log(tableData);
		console.log(Data);
	}, [Data]);
	return (
		<>
			<div
				className=" mt-[130px] p-4 w-full max-w-7xl mx-auto
			 flex items-center justify-center border border-gray-700 rounded-lg"
			>
				<div className="flex flex-grow w-full">
					{tableData && (
						<GenericTable
							data={tableData}
							headers={[
								{ key: "printerName", label: "Printer" },
								{ key: "filamentMaterial", label: "Material" },
								{ key: "consoStr", label: "Conso" },
							]}
							removeElement={(element) =>
								setData(
									Data.filter((data: InputData) => {
										console.log();
										return data.id != element.consoId;
									})
								)
							}
							showRemoveButton
						/>
					)}
				</div>
				{/* <div className="flex flex-row gap-16 w-full">
						<div className="flex-grow"></div>
						{tableData && (
							<GenericTable
								data={tableData}
								headers={[
									{ key: "printerName", label: "Printer" },
									{ key: "filamentMaterial", label: "Material" },
									{ key: "consoStr", label: "Conso" },
								]}
								removeElement={(element) => console.log(element)}
								showRemoveButton
							/>
						)}
					</div> */}
				{/* </div> */}
				{/* </div> */}
			</div>
		</>
	);
}
