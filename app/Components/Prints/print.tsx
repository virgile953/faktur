import { Filament } from "~/types/Filament";
import { print } from "../../types/Print";
import { Printer } from "~/types/Printer";
import { useEffect } from "react";

export default function Print({
	Item,
	Filaments,
	Printer,
}: {
	Item: print;
	Filaments: Filament[];
	Printer: Printer;
}) {
	function convert(n: number): string {
		if (n < 60) return n.toString();
		return `0${(n / 60) ^ 0}`.slice(-2) + ":" + ("0" + (n % 60)).slice(-2);
	}

	useEffect(() => console.log(Printer));
	return (
		<>
			<div className="border border-gray-700 rounded-lg min-h-72 h-full grow">
				{/* Title element */}
				<div className="flex flex-row justify-between border-b border-gray-700">
					{/* Image handling */}
					{Item.image != "" ? (
						<div className="h-32 w-32 min-h-32 min-w-32">
							<img
								className="cover rounded-tl-lg"
								src={`${Item.image.replace("/", "")}`}
							/>
						</div>
					) : (
						<div
							className="h-32 w-32 min-h-32 min-w-32 rounded-tl-lg
						bg-[repeating-linear-gradient(to_bottom_right,#374151_0px,#374151_20px,#1f2937_20px,#1f2937_40px)]"
						/>
					)}
					<div className="flex flex-col text-end items-end w-fit p-2 justify-between">
						<div className="px-2 text-3xl font-semibold">{Item.name}</div>
						<div className="px-1 text-lg">
							{new Date(Item.date).toLocaleDateString("fr-FR")}
						</div>
					</div>
				</div>
				{/* Printer info */}
				<div className="flex flex-row gap-2 border border-gray-700 rounded-lg w-fit m-2 p-2 ">
					<img src="/printer.svg" className="h-8 invert"></img>
					{Printer && <div>{Printer.name}</div>}
				</div>

				{/* Filament infos */}
				<div className="flex flex-row gap-2 border border-gray-700 w-fit p-2 rounded-lg m-2">
					<img src="/filament.svg" className="h-8 invert"></img>

					<div className="flex flex-col">
						{Filaments.length > 0 &&
							Filaments.map((filament) => (
								<div key={filament.id}>
									{Item.filamentQuantity} {filament.unit} {filament.name} (
									{filament.material})
								</div>
							))}
					</div>
				</div>
				{/* Print time */}
				<div className="border border-gray-700 rounded-lg w-fit m-2 p-2">
					<div className="flex flex-row gap-2">
						<img src="/clock.svg" className="h-6 ml-1 invert" />
						<div>
							{Item.timeToPrint}mins{" "}
							{Item.timeToPrint > 59 && `(${convert(Item.timeToPrint)}h)`}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
