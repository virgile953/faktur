import { Filament } from "~/types/Filament";

interface FilamentDetailsProps {
	selectedFilament: Filament;
}

export default function FilamentDetails({
	selectedFilament,
}: FilamentDetailsProps) {
	if (!selectedFilament)
			return <div>coucou</div>
	return (
		<div className="grid grid-cols-3 justify-between m-4 rounded-xl border border-gray-700 max-w-7xl mx-auto">
			{/* Filament details */}
			
			<div className="w-full p-2 col-span-2">
				<div className="flex flex-row justify-between mr-2">
					<div>{selectedFilament.name}</div>
					<div>{selectedFilament.price + " €"}</div>
				</div>
				<ul className="p-2 text-xs">
					<h1 className="text-base text-justify">Description:</h1>
					{selectedFilament.description}
				</ul>
			</div>
			{/* Filament image */}
			<img
				src={selectedFilament.image}
				alt={selectedFilament.name}
				className="h-full w-full rounded-r-xl object-cover col-span-1"
			/>
		</div>
	);
}
