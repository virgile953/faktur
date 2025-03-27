import { NavElement } from "./types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
	BoltIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	DocumentTextIcon,
	HomeIcon,
	InformationCircleIcon,
	PrinterIcon,
	StopCircleIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";

const navElements: NavElement[] = [
	{ name: "Home", href: "/", icon: <HomeIcon height={30} /> },
	{ name: "Printers", href: "/Printers", icon: <PrinterIcon height={30} /> },
	{
		name: "Filaments",
		href: "/Filaments",
		icon: <StopCircleIcon height={30} />,
	},
	{
		name: "Invoices",
		href: "/invoices",
		icon: <DocumentTextIcon height={30} />,
	},
	{
		name: "Config",
		href: "/Config",
		icon: <WrenchScrewdriverIcon height={30} />,
		children: [
			{
				name: "Settings",
				href: "Settings",
				icon: <Cog6ToothIcon height={30} />,
			},
			{
				name: "Electricity",
				href: "Electricity",
				icon: <BoltIcon height={30} />,
			},
			{
				name: "About",
				href: "About",
				icon: <InformationCircleIcon height={30} />,
			},
		],
	},
];

function Navbar() {
	return (
		<div className="App">
			<header
				className="flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-dark-700 rounded-lg bg-dark-200
			 z-[5000] px-8 py-4 items-center justify-center divide-double divide-x"
			>
				{navElements.map((element, index) => (
					<div key={`nav-element-${index}`} className="pl-4 pr-4">
						{" "}
						{element.children ? (
							<Popover className="group">
								<PopoverButton className="flex flex-row items-center gap-1">
									<span className="hidden md:block">
												{element.name}
											</span>
											<span className="block md:hidden">
												{element.icon}
											</span>
									<ChevronDownIcon
										className="align-bottom size-5 group-data-[open]:-rotate-180
									transition duration-100"
									/>
								</PopoverButton>
								<PopoverPanel
									aria-orientation="vertical"
									transition
									anchor="bottom"
									className="mt-4 divide-y divide-white/5 rounded-xl bg-black/80
									 text-sm/6 transition duration-200 ease-in-out 
									 [ data-[closed]:-translate-y-1 data-[closed]:opacity-0
									 "
								>
									{element.children.map((childElement, childIndex) => (
										<Link
										prefetch="intent"
											key={`child-element-${childIndex}`}
											to={`${element.href + "/" + childElement.href}`}
											className="rounded-lg py-2 px-5 transition hover:bg-white/5 w-full hidden sm:block font-medium"
										>
											<span className="hidden sm:block">
												{childElement.name}
											</span>
											<span className="block sm:hidden">
												{childElement.icon}
											</span>
										</Link>
									))}
								</PopoverPanel>
							</Popover>
						) : (
							<Link key={index}  to={`${element.href}`}>
								<span className="hidden md:block">
									{element.name}
								</span>
								<span className="block md:hidden">
									{element.icon}
								</span>
							</Link>
						)}
					</div>
				))}
			</header>
		</div>
	);
}
export default Navbar;
