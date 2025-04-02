import { Filament } from "~/types/Filament";
import { print } from "~/types/Print";
import { Printer } from "~/types/Printer";
import { MainPageFilaments, MainPagePrinters } from "~/types/MainPage";
import { useEffect } from "react";

function Mainpage({
	printersData,
	filamentsData,
}: {
	printersData: MainPagePrinters[];
	filamentsData: MainPageFilaments[];
}) {
	useEffect(() => {
		console.log(printersData);
	}, [printersData]);
	return (
		<>
			<div
				className=" mt-[130px] p-4 w-full max-w-7xl mx-auto
			 flex items-center justify-center border border-gray-700 rounded-lg"
			>
				<div className="flex flex-col items-center gap-16">
					<header className="flex flex-col items-center gap-9 border border-gray-700 p-2 rounded-lg">
						<h1 className="leading text-2xl font-bold text-gray-100 border p-2">
							Welcome
						</h1>
					</header>
					<div className=" border border-gray-700 rounded-lg p-2">
						Most used printers:
						<div>
							{printersData &&
								printersData.map((dataline, idx) => {
									return (
										<div
											className="p-2 flex flex-row justify-between border-b border-b-gray-700"
											key={idx}
										>
											<div className="flex flex-row gap-2">
												{dataline.nbPrints} {"prints"}
												<div className="bg-blue-200 w-[1px]"></div>
												{dataline.printer.name}
											</div>
											<div className="ml-4">
												{new Date(dataline.lastPrintDate).toLocaleDateString(
													"fr-FR"
												)}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className=" border border-gray-700 rounded-lg p-2">
						Most used filaments:
						<div>
							{filamentsData &&
								filamentsData.map((dataline, idx) => {
									return (
										<div
											className="p-2 flex flex-row justify-between border-b border-b-gray-700"
											key={idx}
										>
											<div className="flex flex-row gap-2">
												{dataline.nbPrints} {"prints"}
												<div className="bg-blue-200 w-[1px]"></div>
												{dataline.filament.name}
											</div>
											<div className="ml-4">
												{new Date(dataline.lastPrintDate).toLocaleDateString(
													"fr-FR"
												)}
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mainpage;
