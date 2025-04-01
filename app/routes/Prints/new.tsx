import { MetaFunction } from "@remix-run/react";

// filepath: /home/user/Dev/faktur/app/routes/Prints/new.tsx
export const meta: MetaFunction = () => {
	return [
		{ title: "New Print" },
		{ name: "New Print", content: "Create a new print" },
	];
};

export default function NewPrintPage() {
	return (
		<div>
			<h1>Create a New Print</h1>
			{/* Add your form or UI for creating a new print */}
		</div>
	);
}
