import { Filament } from "~/types/Filament";
import { print } from "../../types/Print";
import { Printer } from "~/types/Printer";

export default function Print({
	Item,
	Filaments,
	Printer,
}: {
	Item: print;
	Filaments: Filament[];
	Printer: Printer;
}) {
	return (
		<>
			<div className="border border-red-700 rounded-lg min-h-72 h-full grow">
				{/* Title element */}
				<div className="flex flex-row justify-between">
					{/* Image handling */}
					{Item.image != "" ? (
						<div className="h-24 w-24 min-h-24 min-w-24">
							<img
								className=" cover rounded-tl-lg"
								src={Item.image}
							/>
						</div>
					) : (
						<div
							className="h-24 w-24 min-h-24 min-w-24 rounded-tl-lg
						bg-[repeating-linear-gradient(to_bottom_right,#373737D0_0px,#373737D0_20px,#0f0f0fD0_20px,#0f0f0fD0_40px)]"
						/>
					)}
					<div className="flex flex-col text-end items-end w-fit justify-between">
						<div className="p-1 text-lg">{Item.date}</div>
						<div className="p-1 text-xl">{Item.name}</div>
						{/* <div className="p-1 text-xl">{Item.client}</div> */}
					</div>
				</div>
				{/* Printer info */}
				<div className="flex flex-row gap-2 border border-gray-700 rounded-lg w-fit m-2 p-2 ">
					<img src="/printer.svg" className="h-8 invert"></img>
					<div>{Printer.name}</div>
				</div>

				{/* Filament infos */}
				<div className="flex flex-row gap-2 border border-gray-700 w-fit p-2 rounded-lg m-2">
					<img src="/filament.svg" className="h-8 invert"></img>

					<div className="flex flex-col">
						{Filaments.map((filament) => (
							<>
								<div className="">
									{Item.filamentQuantity}
									{filament.unit} {filament.name}
								</div>
							</>
						))}
					</div>
				</div>
				<div className="border border-gray-700 rounded-lg w-fit m-2 p-2">
					{/* Print time */}
					<div className="flex flex-row gap-2">
						<img src="/clock.svg" className="h-6 invert" />
						<div>{Item.timeToPrint}mins</div>
					</div>
				</div>
			</div>
		</>
	);
}
