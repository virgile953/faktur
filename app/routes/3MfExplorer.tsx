import { unzipSync, strFromU8 } from "fflate";
import { useState } from "react";

type MfFile = {
	thumbnailUrl?: string | null;

	// Define any props you need here
};

export default function Explorer() {
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !file.name.endsWith(".3mf")) return alert("Please upload a valid 3MF file.");

		const reader = new FileReader();
		reader.onload = () => {
			const zip = unzipSync(new Uint8Array(reader.result as ArrayBuffer));
			const config = Object.keys(zip).find((f) => f.endsWith("model_settings.config"));
			if (!config) return console.warn("No config found.");

			const xml = new DOMParser().parseFromString(strFromU8(zip[config]), "application/xml");
			const thumbPath = Array.from(xml.querySelectorAll("plate metadata"))
				.find((el) => el.getAttribute("key") === "thumbnail_file")
				?.getAttribute("value");

			if (thumbPath && zip[thumbPath]) {
				const url = URL.createObjectURL(new Blob([zip[thumbPath]], { type: "image/png" }));
				setThumbnailUrl(url);
			} else {
				console.warn("Thumbnail not found.");
			}
		};
		reader.onerror = () => alert("Error reading file.");
		reader.readAsArrayBuffer(file);
	};

	return (
		<div className="mt-[130px] p-4 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center border border-gray-700 rounded-lg">
			<div className="flex flex-col items-center justify-center h-screen">
				<input
					className="p-2 m-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
					type="file"
					accept=".3mf"
					onChange={handleFileUpload}
				/>
				{thumbnailUrl && (
					<img src={thumbnailUrl} alt="3MF Thumbnail" className="mt-4 w-64 border rounded" />
				)}
			</div>
		</div>
	);
}
