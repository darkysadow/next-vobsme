import { fetcher } from "@/lib/api"
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function MizhraionniViddilennia() {
    const depList = await fetcher(`${process.env.STRAPI_API_URL}/idepartments`)
    return (
        <Suspense fallback={<div className="container mx-auto py-[50px] text-center text-headerSecond font-probapro text-2xl">Завантаження</div>}>
            <div className="container mx-auto px-5 text-[black] flex flex-col py-5 font-probapro">
                <h1 className="mx-auto text-2xl font-semibold text-headerSecond mb-4">Міжрайонні відділення:</h1>
                <div className="flex flex-row justify-evenly items-center max-md:flex-col-reverse max-md:gap-y-5">
                    <ul className="pl-3 text-xl ">
                        {depList.data.map(depItem => <li className="my-2 max-md:text-center">
                            <Link
                                key={depItem.id}
                                href={"mizhraionni-viddilennia/" + depItem.attributes.slug}
                                className="relative hover:text-headerFirst before:w-full before:h-[.5px] before:bg-headerSecond before:absolute before:bottom-0 before:transition-all before:scale-x-0 hover:before:scale-x-100 transition-all duration-300"
                            >{
                                    depItem.attributes.title}
                            </Link>
                        </li>)}
                    </ul>
                    <Image
                        src={'/regions.png'}
                        width={400}
                        height={412}
                        loading="lazy"
                        style={{
                            height: 'auto',
                            objectFit: "contain"
                        }}
                    />
                </div>

            </div>
        </Suspense>)
}