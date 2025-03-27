import * as React from "react";
import { useState } from "react";
import Navbar from "./ui/Navbar";

function Printers() {
	return (
		<>
			<Navbar />
			<div className="mt-36 grid grid-cols-5 grid-rows-5 h-full w-full gap-8">
				{Array.from({ length: 50 }, (_, i) => (
					<div className="h-32 w-32 bg-gray-400 rounded-lg" key={i}>
						{/* Printer {i + 1} */}
					</div>
				))}
			</div>
		</>
	);
}

export default Printers;
