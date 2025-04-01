import {
	useLoaderData,
	useSubmit,
	Form,
	redirect,
	MetaFunction,
} from "@remix-run/react";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import NewPrintForm from "~/Components/printsPage/NewPrintForm";
import { print } from "~/types/Print";
import { getAllPrinters } from "~/db/printers.server";
import { getAllFilaments } from "~/db/filaments.server";
import Navbar from "~/Components/ui/Navbar";
import { ActionFunctionArgs } from "@remix-run/node";
import { createPrint } from "~/db/prints.server";
import * as fs from "fs";
import * as path from "path";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Print" },
		{ name: "New Print", content: "Create a new print" },
	];
};

export async function loader() {
	const printers = getAllPrinters();
	const filaments = getAllFilaments();
	return { printers, filaments };
}

function readableStreamToAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterable<T> {
	const reader = stream.getReader();
	return {
		async *[Symbol.asyncIterator]() {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				yield value;
			}
		},
	};
}

export async function action({ request }: ActionFunctionArgs) {
	// Process the multipart form data
	const formData = await request.formData();
	const printData = JSON.parse(formData.get("printData") as string);

	// Handle image file upload
	const imageFile = formData.get("image") as File | null;

	if (imageFile && imageFile.size > 0) {
		const uploadsDir = path.join(process.cwd(), "public", "prints", "imgs");
		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir, { recursive: true });
		}

		const fileName = `${Date.now()}_${imageFile.name.replace(
			/[^a-zA-Z0-9._-]/g,
			"_"
		)}`;
		const filePath = path.join(uploadsDir, fileName);

		const fileStream = fs.createWriteStream(filePath);
		await writeAsyncIterableToWritable(
			readableStreamToAsyncIterable(imageFile.stream()),
			fileStream
		);

		printData.image = `/prints/imgs/${fileName}`;
	}

	// Handle print file upload
	const printFile = formData.get("printFile") as File | null;

	if (printFile && printFile.size > 0) {
		const uploadsDir = path.join(process.cwd(), "public", "prints", "files");
		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir, { recursive: true });
		}

		const fileName = `${Date.now()}_${printFile.name.replace(
			/[^a-zA-Z0-9._-]/g,
			"_"
		)}`;
		const filePath = path.join(uploadsDir, fileName);

		const fileStream = fs.createWriteStream(filePath);
		await writeAsyncIterableToWritable(
			readableStreamToAsyncIterable(printFile.stream()),
			fileStream
		);

		printData.file = `/prints/files/${fileName}`;
	}

	createPrint(printData);

	return redirect("/prints");
}

export default function NewPrintPage() {
	const { printers, filaments } = useLoaderData<typeof loader>();
	const submit = useSubmit();

	// Handle form submission
	const handleSubmit = (printData: print, imageFile: File | null, printFile: File | null) => {
		const formData = new FormData();
		formData.append("printData", JSON.stringify(printData));

		// Add the image file if it exists
		if (imageFile) {
			formData.append("image", imageFile);
		}

		// Add the print file if it exists
		if (printFile) {
			formData.append("printFile", printFile);
		}

		submit(formData, { method: "post", encType: "multipart/form-data" });
	};

	return (
		<>
			<Navbar />
			<div className="mt-[130px] h-[calc(100vh-130px)]">
				<NewPrintForm
					printers={printers}
					filaments={filaments}
					onSubmit={handleSubmit}
				/>
			</div>
		</>
	);
}
