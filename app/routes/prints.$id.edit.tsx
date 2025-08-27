import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { getPrintById, updatePrint } from "~/db/prints.server";
import { getAllPrinters } from "~/db/printers.server";
import { getAllFilaments } from "~/db/filaments.server";
import { print } from "~/types/Print";
import Navbar from "~/Components/ui/Navbar";
import NewPrintForm from "~/Components/printsPage/NewPrintForm";
import * as fs from "fs";
import * as path from "path";
import { writeAsyncIterableToWritable } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  const thePrint = getPrintById(id);
  if (!thePrint) throw new Response("Not found", { status: 404 });
  const printers = getAllPrinters();
  const filaments = getAllFilaments();
  return { thePrint, printers, filaments };
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

export async function action({ request, params }: ActionFunctionArgs) {
  const id = Number(params.id);
  const formData = await request.formData();
  const printData = JSON.parse(formData.get("printData") as string) as print;
  printData.id = id;

  // Image file upload (optional replacement)
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "imgs");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(readableStreamToAsyncIterable(imageFile.stream()), fileStream);
    printData.image = `/prints/imgs/${fileName}`;
  }

  // Print file upload (optional replacement)
  const printFile = formData.get("printFile") as File | null;
  if (printFile && printFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "files");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}_${printFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(readableStreamToAsyncIterable(printFile.stream()), fileStream);
    printData.file = `/prints/files/${fileName}`;
  }

  updatePrint(printData);
  return redirect("/prints");
}

export default function EditPrintPage() {
  const { thePrint, printers, filaments } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  console.log(thePrint);
  const handleSubmit = (printData: print, imageFile: File | null, printFile: File | null) => {
    const formData = new FormData();
    formData.append("printData", JSON.stringify(printData));
    if (imageFile) formData.append("image", imageFile);
    if (printFile) formData.append("printFile", printFile);
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
          initialPrint={thePrint}
          submitLabel="Save Changes"
          title="Edit Print"
        />
      </div>
    </>
  );
}
