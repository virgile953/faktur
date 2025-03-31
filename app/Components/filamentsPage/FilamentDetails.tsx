import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Filament } from "~/types/Filament";

interface FilamentDetailsProps {
	selectedFilament: Filament;
	setNewFilament: (filament: Filament) => void;
}

export default function FilamentDetails({
	selectedFilament,
	setNewFilament,
}: FilamentDetailsProps) {
	if (!selectedFilament) return <div>coucou</div>;
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
			<div>
			{/* Filament image */}
			<img
				src={selectedFilament.image}
				alt={selectedFilament.name}
				className="h-full w-full rounded-r-xl object-cover col-span-1"
			/>
			<div className="col-span-2 relative -inset-y-12 -inset-x-4 flex justify-end gap-4 ">
				<button
					className="bg-gray-800 py-2 px-4 rounded-lg flex flex-row gap-2"
					onClick={() => setNewFilament(selectedFilament)}
				>
					<PencilSquareIcon height={24} />
					Edit
				</button>
				<form method="post">
					<input type="hidden" name="_action" value="delete" />
					<input type="hidden" name="filamentId" value={selectedFilament.id} />
					<button
						type="submit"
						className="bg-red-800 py-2 px-4 rounded-lg flex flex-row gap-2"
					>
						<TrashIcon height={24} />
						Delete
					</button>
				</form>
			</div></div>
		</div>
	);
}
