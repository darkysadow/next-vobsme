import { fetcher } from "@/lib/api"
import { markdownToHTML } from "@/lib/markdownToHTML";

export default async function SingleNewsPage({params}) {
    const newsResponse = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/news/${params.news}?populate=*`)
    const description = await markdownToHTML(newsResponse.data.attributes.description);
    return (
        <main className="container mx-auto text-[black] flex flex-col p-7 font-probapro">
            <h1 className="w-full text-center text-2xl mb-4">{newsResponse.data.attributes.title}</h1>
            <div dangerouslySetInnerHTML={{__html: description}} className="dangerously-set-news">
                {/* DESCRIPTION FROM NEWS */}
            </div>
        </main>
    )
}