import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto">
            <Skeleton className='h-4 w-[200px] my-2 ' />
            <div className="container mx-auto text-[black] flex flex-row gap-x-[3.3%] max-md:flex-wrap max-md:gap-y-3">
                <div className="relative w-[30%] max-md:w-[45%] max-[492px]:w-[100%] flex flex-col items-start justify-start shadow-xl p-2 pb-11 pt-8">
                    <Skeleton className='absolute top-1.5 left-1 w-[200px] h-4' />
                    <Skeleton className='w-full h-[200px] my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-[200px] h-4 absolute bottom-2 right-5' />
                </div>
                <div className="relative w-[30%] max-md:w-[45%] max-[492px]:w-[100%] flex flex-col items-start justify-start shadow-xl p-2 pb-11 pt-8">
                    <Skeleton className='absolute top-1.5 left-1 w-[200px] h-4' />
                    <Skeleton className='w-full h-[200px] my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-full h-4 my-2' />
                    <Skeleton className='w-[200px] h-4 absolute bottom-2 right-5' />
                </div>
                <div className="relative w-[30%] max-md:w-[45%] max-[492px]:w-[100%] flex flex-col items-start justify-start shadow-xl p-2 pb-11 pt-8">
                    <Skeleton className='absolute top-1.5 left-1 w-[200px] h-4' />
                    <Skeleton className='w-full h-[200px] my-2' />
                    <Skeleton className='w-full h-4 my-1' />
                    <Skeleton className='w-full h-4 my-1' />
                    <Skeleton className='w-full h-4 my-1' />
                    <Skeleton className='w-full h-4 my-1' />
                    <Skeleton className='w-full h-4 my-1' />
                    <Skeleton className='w-[200px] h-4 absolute bottom-2 right-5' />
                </div>
            </div>
        </div>
    )
}