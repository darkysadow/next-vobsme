import { fetcher } from "@/lib/api"
import Link from "next/link";

export default async function Finances() {
    const response = await fetcher(`${process.env.STRAPI_API_URL}/fininfos`);
    console.log(response.data);
    return (
        <div
         className="text-[black] container mx-auto"
        >
            <h2 className="text-center">FINANCES</h2>
            <ul className="text-[black]">
                {response.data?.map(res => <li key={res.id}>
                    <Link href={`finances/${res.attributes.slug}`}>{res.attributes.title}</Link>
                </li>)}
            </ul>
        </div>
    )
}