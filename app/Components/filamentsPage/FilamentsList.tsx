import { Filament } from "~/types/Filament";

interface FilamentsListProps {
	data: Filament[];
	selectedFilament: Filament;
	setSelectedFilament: (filament: Filament) => void;
}

export default function FilamentsList({
	data,
	selectedFilament,
	setSelectedFilament,
}: FilamentsListProps) {
	return (
		<div className="flex flex-row gap-0 overflow-x-auto relative w-full max-w-7xl mx-auto">
			{data.map((filament, index) => (
				<div
					key={index}
					className={`flex flex-row m-2 min-w-72 border border-gray-700 
										rounded-xl relative cursor-pointer
										${selectedFilament === filament ? "bg-gray-900" : ""}`}
					onClick={() => setSelectedFilament(filament)}
				>
					<img
						src={filament.image}
						className="h-24 w-24 rounded-s-xl"
						alt={filament.name}
					/>
					<div className="flex flex-col p-2 text-sm justify-between relative w-full overflow-hidden">
						<div className="absolute top-0 right-0 text-xs font-bold px-2 py-1 border-l border-b border-gray-700 rounded-bl">
							{filament.price + " €"}
						</div>
						<div className="flex flex-col">
							<div>{filament.brand}</div>
							<div>{filament.material}</div>
							<div>{filament.name}</div>
						</div>
						<div className="text-xs">{"coucou" + " Options"}</div>
					</div>
				</div>
			))}
		</div>
	);
}
