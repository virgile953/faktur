import * as React from "react";
import Navbar from "./ui/Navbar";

function Mainpage() {
	return (
		<>
			<Navbar />

			<div
				className=" mt-[130px] p-4 w-full max-w-7xl mx-auto
			 flex items-center justify-center border border-gray-700 rounded-lg"
			>
				<div className="flex flex-col items-center gap-16">
					<header className="flex flex-col items-center gap-9 border">
						<h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100 border">
							Welcome
						</h1>
						<div className="h-[144px] w-[434px] border">coucou</div>
					</header>
				</div>
			</div>
		</>
	);
}

export default Mainpage;
