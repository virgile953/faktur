import React from "react";
import { Filament } from "~/types/Filament";

interface BaseInfosProps {
	newFilament: Filament;
	setNewFilament: (filament: Filament) => void;
}

export default function BaseInfos({
	newFilament,
	setNewFilament,
}: BaseInfosProps) {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="grid grid-cols-10 gap-4">
				<label className="flex flex-col gap-1 col-span-7">
					Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.name || ""}
						onChange={(e) =>
							setNewFilament({ ...newFilament, name: e.target.value })
						}
					/>
				</label>
				<label className="flex flex-col gap-1 col-span-3">
					Price
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
							value={newFilament.price || 0}
							type="number"
							onChange={(e) =>
								setNewFilament({
									...newFilament,
									price: Number(e.target.value),
								})
							}
						/>
						<span className="ml-2">€</span>
					</div>
				</label>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<label className="flex flex-col gap-1">
					Brand
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.brand || ""}
						onChange={(e) =>
							setNewFilament({ ...newFilament, brand: e.target.value })
						}
					/>
				</label>
				<label className="flex flex-col gap-1">
					Material
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.material || ""}
						onChange={(e) =>
							setNewFilament({
								...newFilament,
								material: e.target.value,
							})
						}
					/>
				</label>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<label className="flex flex-col gap-1">
					Color
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.color || ""}
						onChange={(e) =>
							setNewFilament({ ...newFilament, color: e.target.value })
						}
					/>
				</label>
				<label className="flex flex-col gap-1">
					Image
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.image || ""}
						onChange={(e) =>
							setNewFilament({ ...newFilament, image: e.target.value })
						}
					/>
				</label>
			</div>
			<div className="grid grid-cols-5 gap-4">
				<label className="flex flex-col gap-1 col-span-3">
					Quantity
					<div className="w-full flex flex-row">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full"
							type="number"
							value={newFilament.quantity || ""}
							onChange={(e) =>
								setNewFilament({
									...newFilament,
									quantity: Number(e.target.value),
								})
							}
						/>
						<span className="-ml-10 mt-1">{newFilament.unit}</span>
					</div>
				</label>
				<label className="flex flex-col gap-1 col-span-2">
					Unit
					<select
						className="bg-gray-900 rounded-lg pl-2 p-1"
						value={newFilament.unit}
						onChange={(e) =>
							setNewFilament({
								...newFilament,
								unit: e.target.value,
							})
						}
					>
						<option value={"g"}>grams</option>
						<option value={"ml"}>milliliters</option>
					</select>
				</label>
			</div>
		</div>
	);
}
