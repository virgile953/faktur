import * as React from "react";
import Navbar from "./ui/Navbar";

function Mainpage() {
	return (
		<>
			<Navbar />
			
			<div className="flex h-screen items-center justify-center">
				<div className="flex flex-col items-center gap-16">
					<header className="flex flex-col items-center gap-9">
						<h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
							Welcome
						</h1>
						<div className="h-[144px] w-[434px]"></div>
					</header>
					<nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700"></nav>
				</div>
			</div>
		</>
	);
}

export default Mainpage;
