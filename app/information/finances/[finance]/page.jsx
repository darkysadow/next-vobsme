import { fetcher } from "@/lib/api"

export default async function Finance({params}) {
    
    const response = await fetcher(
        `${process.env.STRAPI_API_URL}/slugify/slugs/fininfo/${params.finance}?populate=*`
        )
    console.log(params.finance, response.data);
    return (
        <main className="text-[black] flex flex-col container mx-auto px-4">
            <h1
                className="text-center my-4 text-headerSecond font-probapro text-2xl"
            >
                {response.data.attributes.title}
            </h1>
            
        </main>
    )
}