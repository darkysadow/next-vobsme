import { fetcher } from "@/lib/api"
import NewsCard from "./NewsCard";

export default async function AllNews () {
    const newsData = await fetcher(`${process.env.STRAPI_API_URL}/newss?populate=previewImage&pagination[start]=0&pagination[limit]=3&sort[0]=id:desc&sort[1]=id`)
    return (
        <div className="container mx-auto text-[black] flex flex-row gap-x-[3.3%] max-md:flex-wrap max-md:gap-y-3">
            {newsData.data.map(news => <NewsCard 
                key={news.id} 
                id={news.id} 
                item={news.attributes} 
            />)}
        </div>

    )
}