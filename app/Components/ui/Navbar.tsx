import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type NavElement = {
	name: string;
	href: string;
	children?: NavElement[];
};

const navElements: NavElement[] = [
	{ name: "Home", href: "#home" },
	{ name: "Catalog", href: "#Catalog" },
	{ name: "All products", href: "#All-products" },
	{ name: "Config", href: "#Config" },
];

function Navbar() {
	// adding the states
	const [isActive, setIsActive] = useState(false);
	//add the active class
	const toggleActiveClass = () => {
		setIsActive(!isActive);
	};
	//clean up function to remove the active class
	const removeActive = () => {
		setIsActive(false);
	};
	return (
		<div className="App">
			<header className="App-header">
				<nav className="flex flex-col md:flex-row items-left md:items-center sm:mb-0 justify-between p-5 border border-red-700">
					<a href="#home">Dev. </a>
					{navElements.map((element, index) => (
						<div key={index} onClick={removeActive}>
							<a href={`${element.href}`}>{element.name}</a>
						</div>
					))}

					<div onClick={toggleActiveClass}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</nav>
			</header>
		</div>
	);
}
export default Navbar;
