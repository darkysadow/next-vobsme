import { fetcher } from "@/lib/api";
import { markdownToHTML } from "@/lib/markdownToHTML";

export default async function Region({params}) {
    const depRes = await fetcher(`${process.env.STRAPI_API_URL}/slugify/slugs/idepartment/${params.region}?populate=head_of_department&populate=head_of_department.photo`)
    const headOfDepartment = depRes.data.attributes.head_of_department.data ? depRes.data.attributes.head_of_department.data.attributes : undefined
    const headOfDepartmentPhoto = headOfDepartment !== undefined && headOfDepartment.photo.data.attributes
    const description = await markdownToHTML(depRes.data.attributes.description)
    return (
        <main className="container px-5 mx-auto text-[black]">
            region {params.region}
        </main>
    )
}