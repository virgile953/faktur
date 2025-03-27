export type NavElement = {
	name: string;
	href: string;
	icon: JSX.Element;
	children?: NavElement[];
};