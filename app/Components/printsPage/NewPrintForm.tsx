import { Link } from "@remix-run/react";
import { useState, useRef } from "react";
import { print } from "~/types/Print";
import { Printer } from "~/types/Printer";
import { Filament } from "~/types/Filament";
import FilterSelect from "../Prints/FilterSelect";

interface NewPrintFormProps {
	printers: Printer[];
	filaments: Filament[];
	onSubmit: (
		printData: print,
		imageFile: File | null,
		printFile: File | null
	) => void;
}

export default function NewPrintForm({
	printers,
	filaments,
	onSubmit,
}: NewPrintFormProps) {
	const [newPrint, setNewPrint] = useState<print>({
		name: "",
		date: new Date(),
		client: 0,
		printerUsed: 0,
		filamentsUsed: [],
		timeToModel: 0,
		timeToPrint: 0,
		timeToPostProcess: 0,
		image: "",
		filamentsQuantity: [0],
		file: "",
		usedUpgrades: [],
		usedConsumables: [],
	});

	// Track selected filaments
	const [selectedFilaments, setSelectedFilaments] = useState<number[]>([]);

	// File input references and states
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	// Print file input references and states
	const printFileInputRef = useRef<HTMLInputElement>(null);
	const [printFile, setPrintFile] = useState<File | null>(null);

	// Handle image file selection
	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);

			// Generate a preview of the selected image
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setImagePreview(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);

			// Set the filename in the print object
			const fileName = `${Date.now()}_${file.name}`;
			setNewPrint({
				...newPrint,
				image: `/prints/imgs/${fileName}`, // This will be the path after saving
			});
		}
	};

	// Handle print file selection
	const handlePrintFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setPrintFile(file);

			// Set the filename in the print object
			const fileName = `${Date.now()}_${file.name}`;
			setNewPrint({
				...newPrint,
				file: `/prints/files/${fileName}`, // This will be the path after saving
			});
		}
	};

	// Handle form submission
	const handleSubmit = () => {
		// Call the onSubmit function with both print data, image file, and print file
		onSubmit(newPrint, imageFile, printFile);
	};

	// Handle filament selection
	const handleFilamentSelect = (filamentId: number) => {
		if (selectedFilaments.includes(filamentId)) {
			setSelectedFilaments(selectedFilaments.filter((id) => id !== filamentId));
			setNewPrint({
				...newPrint,
				filamentsUsed: newPrint.filamentsUsed.filter((id) => id !== filamentId),
			});
		} else {
			setSelectedFilaments([...selectedFilaments, filamentId]);
			setNewPrint({
				...newPrint,
				filamentsUsed: [...newPrint.filamentsUsed, filamentId],
			});
		}
	};
	const handleQuantityChange = (filamentId: number, quantity: number) => {
		const index = newPrint.filamentsUsed.indexOf(filamentId);
		if (index !== -1) {
			const updatedQuantities = [...newPrint.filamentsQuantity];
			updatedQuantities[index] = quantity;
			setNewPrint({
				...newPrint,
				filamentsQuantity: updatedQuantities,
			});
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4">
			<h1 className=" p-2 rounded-lg text-3xl mb-4">
				Create a New Print
			</h1>
			<div className="border border-gray-700 p-6 rounded-lg grid md:grid-cols-[16rem_70%] gap-4">
				{/* Printer selector */}
				<label className="flex flex-col gap-1 mb-2">
					Printer Used
					<FilterSelect
						items={printers}
						selectedItem={
							printers.find((printer) => printer.id === newPrint.printerUsed) ||
							null
						}
						setSelectedItem={(printer) =>
							setNewPrint({ ...newPrint, printerUsed: printer!.id! })
						}
						showAll={false}
						label="Printer"
					/>
				</label>

				{/* Filaments selector */}
				<div className="">
					<label className="block mb-2">Filaments Used</label>
					<div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto rounded-lg">
						{filaments.map((filament) => (
							<div
								key={filament.id}
								onClick={() => handleFilamentSelect(filament.id!)}
								className={`rounded-lg cursor-pointer flex items-center gap-4 h-12 w-fit pr-3 border border-gray-700 ${
									selectedFilaments.includes(filament.id!)
										? "bg-blue-600"
										: "bg-gray-800"
								}`}
							>
								<img
									src={`${filament.image}`}
									alt={filament.name}
									className="h-12 w-12 rounded-l-lg"
								/>
								{filament.name}
								<div className="ml-auto text-gray-400 text-sm">
									{filament.material}
								</div>
								{selectedFilaments.includes(filament.id!) && (
									<>
										<input
											onClick={(e) => e.stopPropagation()}
											onChange={(e) =>
												handleQuantityChange(
													filament.id!,
													Number(e.target.value)
												)
											}
											min={0}
											type="number"
											className="text-gray-400 p-2 rounded-lg w-20"
										/>
										<span className="relative -inset-x-12">
											{filament.unit}
										</span>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="border border-gray-700 p-6 rounded-lg grid grid-cols-2 gap-4">
				{/* Print Name */}
				<label className="flex flex-col gap-1 mb-2">
					Print Name
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.name}
						onChange={(e) => setNewPrint({ ...newPrint, name: e.target.value })}
						placeholder="Enter print name"
					/>
				</label>

				{/* Client */}
				<label className="flex flex-col gap-1 mb-2">
					Client
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="text"
						value={newPrint.client || ""}
						onChange={(e) =>
							setNewPrint({ ...newPrint, client: Number(e.target.value) })
						}
						placeholder="Select client"
					/>
				</label>

				{/* Print Date */}
				<label className="flex flex-col gap-1 mb-2">
					Print Date
					<input
						className="bg-gray-900 rounded-lg pl-2 p-1"
						type="date"
						value={new Date(newPrint.date).toISOString().split("T")[0]}
						onChange={(e) =>
							setNewPrint({
								...newPrint,
								date: new Date(e.target.value),
							})
						}
					/>
				</label>

				{/* Modelisation Time */}
				<label className="flex flex-col gap-1 mb-2">
					Modelisation Time
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							type="number"
							value={newPrint.timeToModel || ""}
							onChange={(e) =>
								setNewPrint({
									...newPrint,
									timeToModel: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
						<span className="ml-2">minutes</span>
					</div>
				</label>
				{/* Print Time */}
				<label className="flex flex-col gap-1 mb-2">
					Print Time
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							type="number"
							value={newPrint.timeToPrint || ""}
							onChange={(e) =>
								setNewPrint({
									...newPrint,
									timeToPrint: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
						<span className="ml-2">minutes</span>
					</div>
				</label>
				{/* postProcess Time */}
				<label className="flex flex-col gap-1 mb-2">
					Postprocess Time
					<div className="flex flex-row items-center">
						<input
							className="bg-gray-900 rounded-lg pl-2 p-1 w-full text-right"
							type="number"
							value={newPrint.timeToPostProcess || ""}
							onChange={(e) =>
								setNewPrint({
									...newPrint,
									timeToPostProcess: Number(e.target.value),
								})
							}
							placeholder="0"
						/>
						<span className="ml-2">minutes</span>
					</div>
				</label>
				<div className="">
					{/* Image Upload */}
					<label className="flex flex-col gap-1 mb-2 bg-gray-800 rounded-lg p-2 cursor-pointer">
						Image
						<div className="bg-gray-900 rounded-lg pl-2 p-1 flex items-center justify-between">
							<span className="text-gray-400">
								{imageFile ? imageFile.name : "Choose a file..."}
							</span>
							<button
								type="button"
								className="bg-gray-700 px-3 py-1 rounded"
								onClick={() => fileInputRef.current?.click()}
							>
								Browse
							</button>
						</div>
						<input
							ref={fileInputRef}
							className="hidden"
							type="file"
							accept="image/*"
							onChange={handleImageSelect}
						/>
					</label>

					{/* Print File Upload */}
					<label className="flex flex-col gap-1 mb-2 bg-gray-800 rounded-lg p-2 cursor-pointer">
						Print File
						<div className="bg-gray-900 rounded-lg pl-2 p-1 flex items-center justify-between">
							<span className="text-gray-400">
								{printFile ? printFile.name : "Choose a file..."}
							</span>
							<button
								type="button"
								className="bg-gray-700 px-3 py-1 rounded"
								onClick={() => printFileInputRef.current?.click()}
							>
								Browse
							</button>
						</div>
						<input
							ref={printFileInputRef}
							className="hidden"
							type="file"
							accept=".stl,.obj,.3mf,.gcode"
							onChange={handlePrintFileSelect}
						/>
					</label>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex justify-end gap-4 mt-4">
				<Link to="/prints">
					<button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
						Cancel
					</button>
				</Link>
				<button
					className="bg-gradient-to-t from-gray-900 to-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
					onClick={handleSubmit}
				>
					Create Print
				</button>
			</div>
		</div>
	);
}
