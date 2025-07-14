import { Filament } from "~/types/Filament";
import { print } from "../../types/Print";
import { Printer } from "~/types/Printer";
import { useEffect } from "react";
import { Conso } from "~/types/conso";

export default function Print({
	Item,
	Filaments,
	Printer,
	consos,
	elecPrice,
}: {
	Item: print;
	Filaments: Filament[];
	Printer: Printer;
	consos: Conso[];
	elecPrice: number;
}) {
	function convert(n: number): string {
		if (n < 60) return n.toString();
		return `0${(n / 60) ^ 0}`.slice(-2) + ":" + ("0" + (n % 60)).slice(-2);
	}

	//Assume we're doing 50/50 per material
	function calculatePriceElec() {
		const hToPrint = Item.timeToPrint / 60;
		const priceElec = elecPrice * hToPrint;

		const totalConso = consos.reduce((a, b) => {
			return a + b.consoKw;
		}, 0);
		const totalPrice = elecPrice * hToPrint * (totalConso / 1000);
		console.log(totalPrice);
		return totalPrice;
	}

	function calculatePriceFil() {
		let total: number = 0;
		Filaments.map((filament, idx) => {
			const priceForFilament: number = (filament.price / 1000 ) * Item.filamentsQuantity[idx];
			total += priceForFilament;
		});
		//assert that Item.filamentsUsed.length == Filaments.length (i fucked up at the start of development)
		return total / Item.filamentsUsed.length;
	}

	useEffect(() => console.log(elecPrice));
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
								src={`prints/imgs/${Item.image.replace("/", "")}`}
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
				<div className="flex flex-row gap-2 w-fit m-2 p-2 ">
					<img src="/printer.svg" className="h-8 invert"></img>
					{Printer && <div>{Printer.name}</div>}
				</div>

				{/* Filament infos */}
				<div className="flex flex-row gap-2 border-t border-b border-gray-800 p-2 my-2">
					<img src="/filament.svg" className="h-8 ml-2 invert"></img>

					<div className="flex flex-col">
						{Filaments.length > 0 &&
							Filaments.map((filament, idx) => (
								<div key={filament.id}>
									{Item.filamentsQuantity[idx]} {filament.unit} {filament.name} (
									{filament.material})
								</div>
							))}
					</div>
				</div>
				{/* Print time */}
				<div className="w-fit m-2 p-2">
					<div className="flex flex-row gap-2">
						<img src="/clock.svg" className="h-6 ml-1 invert" />
						<div>
							{Item.timeToPrint}mins{" "}
							{Item.timeToPrint > 59 && `(${convert(Item.timeToPrint)}h)`}
						</div>
					</div>
				</div>
				<div className=" border-t m-2 p-2">
					{consos.length == 0 && (
						<div>no conso info for this printer and materials</div>
					)}
					{consos.length > 0 && (
						<>
							<div>{calculatePriceElec().toFixed(2)} € elec</div>
							<div>{calculatePriceFil().toFixed(2)} € filament</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
