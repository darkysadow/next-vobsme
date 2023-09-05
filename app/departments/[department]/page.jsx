import DepartmentPage from "@/components/departmentPage/DepartmentPage";
import { fetcher } from "@/lib/api";
import { markdownToHTML } from "@/lib/markdownToHTML";

export default async function Department({params}) {
    const departmentData = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/department/${params.department}?populate=head_of_department&populate=head_of_department.photo`)
    const headOfDepartment = departmentData.data.attributes.head_of_department.data ? departmentData.data.attributes.head_of_department.data.attributes : undefined
    const headOfDepartmentPhoto = headOfDepartment !== undefined && headOfDepartment.photo.data.attributes
    const description = await markdownToHTML(departmentData.data.attributes.description)
    return (
        <DepartmentPage departmentData={departmentData} headOfDepartment={headOfDepartment} headOfDepartmentPhoto={headOfDepartmentPhoto} description={description}/>
    )
}