import { fetcher } from "@/lib/api"

export default async function Departments() {
    const departmentsData = await fetcher(`${process.env.STRAPI_API_URL}/departments`)
    console.log(await departmentsData.data[0].attributes);
    return (<div className="text-[black]">Departments: <br /> 
      {departmentsData.data.map(department => <div key={department.id}>
        {department.attributes.title}
      </div>)}
    </div>)
}
