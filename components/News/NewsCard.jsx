import Image from "next/image";
import Link from "next/link";
import FontAwesomeNewspaper from "../fontAwesomeClientComponents/Newspaper";

export default function NewsCard({ id, item }) {
    const convertDate = (dateString) => {
        const months = [
          'січня',
          'лютого',
          'березня',
          'квітня',
          'травня',
          'червня',
          'липня',
          'серпня',
          'вересня',
          'жовтня',
          'листопада',
          'грудня'
        ];
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
      
        return `${day} ${month} ${year}`;
      }
    return (
        <div className="relative w-[30%] max-md:w-[45%] max-[492px]:w-[100%] flex flex-col items-start justify-start shadow-xl p-2 pb-11 pt-8 font-probapro">
            <div className="absolute top-1.5 left-1 flex flex-row gap-x-2 items-center">
                <Image src={'/icn-time.svg'} width={20} height={20} alt="time"/>
                <p className="text-base text-[gray]">{convertDate(item.publishedAt)}</p>
            </div>
            {item.previewImage.data ?
                <Image
                    src={`${process.env.STRAPI_URL}${item.previewImage.data.attributes.url}`}
                    width={300}
                    height={item.previewImage.data.attributes.height}
                    alt={item.previewImage.data.attributes.alternativeText ? item.previewImage.data.attributes.alternativeText : 'Зображення '}
                    style={{ objectFit: "cover", backgroundColor: 'rgba(12,12,12,0.3)', height: '200px' }}
                    className="mx-auto"
                /> :
                <div className="h-[200px] w-[100%] flex justify-center items-center">
                    <FontAwesomeNewspaper color={"gray"} size={'2xl'} />
                </div>
            }
            <h2 className="font-semibold">{item.title}</h2>
            <p className="line-clamp-4 w-[100%]">{item.description}</p>
            <Link href={`news/${item.slug}`} className="absolute bottom-2 right-5 hover:text-headerFirst text-headerSecond font-semibold">Перейти до новини</Link>
        </div>
    )
}