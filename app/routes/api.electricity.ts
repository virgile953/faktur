import { type ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { updateConsos, updateElecPrice } from "~/db/conso.server";
import { Conso } from "~/types/conso";

export async function action({ request }: ActionFunctionArgs) {
	switch (request.method) {
		case "POST": {
			// New cost
			const coucou: Conso[] = await request.json();
			const nb = updateConsos(coucou);
			return Response.json({ updated: nb });
		}
		case "PUT": {
			const reqData: { data: Conso[] } = await request.json();
			console.log(reqData);
		}
		case "PATCH": {
			// edit electricity cost
			const reqData: { newPrice: number } = await request.json();
			return Response.json({ updated: updateElecPrice(reqData.newPrice) });
		}
		case "DELETE": {
			// delete printer -> filament link
			/* handle "DELETE" */
		}
	}
	return null;
}
