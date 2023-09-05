import { Skeleton } from "@/components/Skeleton";


export default function MizhraionniViddilenniaLoader() {
    return (
        <div className="container mx-auto flex flex-col py-5">
            <Skeleton className='mx-auto h-4 w-[310px] mb-4' />
            <div className="flex flex-row justify-evenly items-center max-md:flex-col-reverse max-md:gap-y-5">
                <div className="flex flex-col">
                    <Skeleton className="w-[195px] h-4 my-2" />
                    <Skeleton className="w-[260px] h-4 my-2" />
                    <Skeleton className="w-[340px] h-4 my-2" />
                    <Skeleton className="w-[280px] h-4 my-2" />
                    <Skeleton className="w-[180px] h-4 my-2" />
                    <Skeleton className="w-[230px] h-4 my-2" />
                    <Skeleton className="w-[300px] h-4 my-2" />
                    <Skeleton className="w-[320px] h-4 my-2" />
                    <Skeleton className="w-[300px] h-4 my-2" />
                    <Skeleton className="w-[290px] h-4 my-2" />
                    <Skeleton className="w-[280px] h-4 my-2" />
                    <Skeleton className="w-[220px] h-4 my-2" />
                    <Skeleton className="w-[210px] h-4 my-2" />
                    <Skeleton className="w-[240px] h-4 my-2" />
                    <Skeleton className="w-[195px] h-4 my-2" />
                    <Skeleton className="w-[330px] h-4 my-2" />
                    <Skeleton className="w-[180px] h-4 my-2" />
                    <Skeleton className="w-[300px] h-4 my-2" />
                    <Skeleton className="w-[250px] h-4 my-2" />
                </div>
                <Skeleton className="h-[417px] w-[417px] max-md:h-auto " />
            </div>
        </div>
    )
}