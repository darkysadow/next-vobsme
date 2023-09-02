import Image from "next/image";
import Link from "next/link";
import FontAwesomeNewspaper from "../fontAwesomeClientComponents/Newspaper";

export default function NewsCard({ id, item }) {
    return (
        <div className="relative w-[30%] max-md:w-[45%] max-[492px]:w-[100%] flex flex-col items-start justify-start shadow-xl p-2 pb-11 font-probapro">
        
                {item.previewImage.data ?
                    <Image
                        src={`${process.env.STRAPI_URL}${item.previewImage.data.attributes.url}`}
                        width={300}
                        height={item.previewImage.data.attributes.height}
                        alt={item.previewImage.data.attributes.alternativeText ? item.previewImage.data.attributes.alternativeText : 'Зображення '}
                        style={{ objectFit: "cover", backgroundColor: 'rgba(12,12,12,0.3)', height: '200px' }}
                        className="max-[492px]:mx-auto"
                    /> :
                    <div className="h-[200px] w-[100%] flex justify-center items-center">
                        <FontAwesomeNewspaper color={"gray"} size={'2xl'} />
                    </div>
                }
                <Link href={`news/${item.slug}`}>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="line-clamp-4 w-[100%]">{item.description}</p>
                <Link href={`news/${item.slug}`} className="absolute bottom-2 right-5 hover:text-headerFirst text-headerSecond font-semibold">Перейти до новини</Link>
        </Link>
        </div>
    )
}