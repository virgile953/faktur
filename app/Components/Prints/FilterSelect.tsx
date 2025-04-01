import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface FilterSelectProps<T extends { name: string; image: string }> {
	items: T[];
	selectedItem: T | null;
	setSelectedItem: (item: T | null) => void;
	label: string; // Label for the filter (e.g., "Printer", "Filament")
	showAll?: boolean; // Optional prop to show "All" option
}

export default function FilterSelect<
	T extends { name: string; image: string }
>({ items, selectedItem, setSelectedItem, label, showAll= true }: FilterSelectProps<T>) {
	return (
		<Popover className="group min-w-64 max-w-64">
			<PopoverButton
				className="flex flex-row w-full border
									group-data-[open]:border-b-transparent group-data-[open]:rounded-b-none
									border-gray-700 rounded-lg items-center justify-between gap-1"
			>
				{selectedItem == null ? (
					<div className="p-2">{label}</div>
				) : (
					<div className="flex flex-row gap-4">
						<img
							className="h-10 rounded-lg"
							src={selectedItem.image}
							alt={selectedItem.name}
						/>
						<div className="mt-2">{selectedItem.name}</div>
					</div>
				)}
				<ChevronDownIcon
					className="align-bottom size-5 group-data-[open]:-rotate-180
											transition duration-100"
				/>
			</PopoverButton>
			<PopoverPanel
				aria-orientation="vertical"
				transition
				anchor="bottom"
				className="divide-y divide-white/5 rounded-b-lg bg-black/95
										text-sm/6 transition duration-200 ease-in-out
										[data-[closed]:-translate-y-1 data-[closed]:opacity-0
										border border-gray-700 w-64"
			>
				{({ close }) => (
					<>
						{selectedItem && showAll && (
							<div
								key="remove-filter"
								className="rounded-lg py-2 px-5 transition hover:bg-white/5 w-full block font-medium"
								onClick={() => {
									setSelectedItem(null);
									close();
								}}
							>
								<div className="flex flex-row gap-4">
									<img
										className="h-10 bg-white rounded-lg"
										src="/removeFilter.svg"
										alt="Remove filter"
									/>
									<div className="mt-2">All {label.toLowerCase()}s</div>
								</div>
							</div>
						)}
						{items.map((item, index) => (
							<div
								key={index}
								className="rounded-lg py-2 px-5 transition hover:bg-white/5 w-full block font-medium"
								onClick={() => {
									setSelectedItem(item);
									close();
								}}
							>
								<div className="flex flex-row gap-4">
									<img
										className="h-10 rounded-lg"
										src={item.image}
										alt={item.name}
									/>
									<div className="mt-2">{item.name}</div>
								</div>
							</div>
						))}
					</>
				)}
			</PopoverPanel>
		</Popover>
	);
}
