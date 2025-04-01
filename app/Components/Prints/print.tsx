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
			<div className="border border-red-700 rounded-lg h-44 grow">
				{/* Title element */}
				<div className="flex flex-row">
					{/* Image handling */}
					{Item.image != "" ? (
						<div className="h-24 w-24 min-h-24 min-w-24">
							<img
								className="border border-red-700 cover rounded-tl-lg"
								src={Item.image}
							/>
						</div>
					) : (
						<div
							className="h-24 w-24 min-h-24 min-w-24 rounded-lg
						bg-[repeating-linear-gradient(to_bottom_right,#373737_0px,#373737_20px,#0f0f0f_20px,#0f0f0f_40px)]"
						/>
					)}
					<div className="flex flex-col w-full text-end">
						<div className="p-1 text-lg">{Item.date}</div>
						<div className="p-1 text-xl">{Item.name}</div>
					</div>
				</div>
				<div>{Item.filamentQuantity}</div>
			</div>
		</>
	);
}
