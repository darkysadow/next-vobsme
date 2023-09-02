import { fetcher } from "@/lib/api";
import { markdownToHTML } from "@/lib/markdownToHTML";

export default async function Department({params}) {
    const departmentData = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/department/${params.department}`)
    console.log(departmentData);
    const description = await markdownToHTML(departmentData.data.attributes.description)
    return (
        <main className="container mx-auto text-[black] font-probapro flex flex-col py-8">
            <h1 className="text-center font-semibold text-2xl text-headerSecond mb-6">
                {departmentData.data.attributes.title}
            </h1>
            <div dangerouslySetInnerHTML={{__html: description}} className="dangerously-set-news"></div>
        </main>
    )
}