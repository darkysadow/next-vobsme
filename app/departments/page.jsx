import { fetcher } from "@/lib/api"
import Link from "next/link";

export default async function Departments() {
    const departmentsData = await fetcher(`${process.env.STRAPI_API_URL}/departments`)
    return (<div className="text-[black]">Departments: <br /> 
      {departmentsData.data.map(department => <div key={department.id}>
        <Link href={'/departments/'+department.attributes.slug}>{department.attributes.title}</Link>
      </div>)}
    </div>)
}
