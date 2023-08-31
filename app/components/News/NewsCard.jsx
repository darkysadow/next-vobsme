import Image from "next/image";
import Link from "next/link";

export default function NewsCard ({id, item}) {
    return(
        <div key={id} className='w-[30%] flex flex-col items-start justify-start shadow-xl p-2 relative pb-11'>
            <Image 
                src={`${process.env.STRAPI_URL}${item.previewImage.data.attributes.url}`} 
                width={300}
                height={item.previewImage.data.attributes.height} 
                alt={item.previewImage.data.attributes.alternativeText ? item.previewImage.data.attributes.alternativeText : 'Зображення '}
                style={{objectFit: "cover", backgroundColor: 'rgba(12,12,12,0.3)', height: '200px'}}
            />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="line-clamp-4">{item.description}</p>
            <Link href={`news/${item.slug}`} className="absolute bottom-2 right-5 hover:text-headerFirst">Перейти до новини →</Link>
        </div>
    )
}