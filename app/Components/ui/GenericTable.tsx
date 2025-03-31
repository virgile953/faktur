import React from "react";

interface GenericTableProps<T> {
	data: T[];
	headers: { key: keyof T; label: string }[];
	removeElement?: (item: T) => void;
	showRemoveButton?: boolean;
}

export default function GenericTable<T>({
	data,
	headers,
	removeElement,
	showRemoveButton = true,
}: GenericTableProps<T>) {
	return (
		<table className="table-auto rounded-lg w-full">
			<thead>
				<tr className="bg-gray-900">
					{headers.map((header, idx) => (
						<th key={idx} className="border px-4 py-2 text-left">
							{header.label}
						</th>
					))}
					{showRemoveButton && removeElement && (
						<th className="border px-4 text-center w-24">Remove</th>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr
						key={index}
						className={`border hover:bg-gray-800 ${
							index % 2 ? "bg-gray-900/50" : ""
						}`}
					>
						{headers.map((header, idx) => (
							<td key={idx} className="border py-1 px-2 max-w-lg overflow-x-clip text-ellipsis">
								{String(item[header.key])}
							</td>
						))}
						{showRemoveButton && removeElement && (
							<td className="border py-1 px-2 text-center">
								<button
									className="bg-red-900 text-white px-2 py-0.5 rounded"
									onClick={() => removeElement(item)}
								>
									X
								</button>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
