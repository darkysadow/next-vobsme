import { fetcher } from "@/lib/api"

export default async function SingleNewsPage({params}) {
    const newsResponse = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/newss/${params.news}?populate=*`)
    await console.log(newsResponse);
    return (
        <main className="container mx-auto text-[black]">
            Новина {params.news}
        </main>
    )
}