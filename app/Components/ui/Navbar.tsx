import { useState } from "react";
import { NavElement } from "./types";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const navElements: NavElement[] = [
	{ name: "Home", href: "#home" },
	{ name: "Catalog", href: "#Catalog" },
	{ name: "All products", href: "#All-products" },
	{
		name: "Config",
		href: "#Config",
		children: [
			{ name: "Settings", href: "#Settings" },
			{ name: "Options", href: "#Options" },
			{ name: "About", href: "#About" },
		],
	},
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

						<a href="#home">Dev. </a>
						{navElements.map((element, index) => (
							<div key={index} onClick={removeActive}>
								<a href={`${element.href}`}>{element.name}</a>
							</div>
						))}
<Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
						<div onClick={toggleActiveClass}>
							<span></span>
							<span></span>
							<span></span>
						</div>
			</header>
		</div>
	);
}
export default Navbar;
