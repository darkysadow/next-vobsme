import PDFViewer from "@/components/pdfViewer/PDFViewer";
import { fetcher } from "@/lib/api"
import Link from "next/link";


export default async function Finance({ params }) {

    const response = await fetcher(
        `${process.env.STRAPI_API_URL}/slugify/slugs/fininfo/${params.finance}?populate=*`
    )

    const pdfDocument = response.data.attributes.document.data.attributes;
    return (
        <main className="text-[black] flex flex-col container mx-auto px-4">
            <h1
                className="text-center my-4 text-headerSecond font-probapro text-2xl"
            >
                {response.data.attributes.title}

            </h1>
            <PDFViewer url={pdfDocument.url} />
            <div className="flex flex-row justify-center my-5">
                <Link href={`${process.env.STRAPI_URL}${pdfDocument.url}`}
                    className="p-4 w-[300px] text-center bg-headerFirst text-[white] text rounded-md font-probapro hover:bg-headerSecond ">
                    Відкрити в браузері</Link>
            </div>

        </main>
    )
}