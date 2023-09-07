import DepartmentPage from "@/components/departmentPage/DepartmentPage";
import { fetcher } from "@/lib/api";
import { markdownToHTML } from "@/lib/markdownToHTML";
import { Suspense } from "react";

export default async function Region({params}) {
    const depRes = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/idepartment/${params.region}?populate=head_of_department&populate=head_of_department.photo`)
    const headOfDepartment = depRes.data.attributes.head_of_department.data ? depRes.data.attributes.head_of_department.data.attributes : undefined
    const headOfDepartmentPhoto = headOfDepartment !== undefined && headOfDepartment.photo.data.attributes
    const description = await markdownToHTML(depRes.data.attributes.description)
    console.log(depRes);
    return (
        <Suspense fallback={<div className="container mx-auto py-[50px] text-center text-headerSecond font-probapro text-2xl">Завантаження</div>}>
            <DepartmentPage departmentData={depRes} headOfDepartment={headOfDepartment} headOfDepartmentPhoto={headOfDepartmentPhoto} description={description}/>
        </Suspense>
        )
}