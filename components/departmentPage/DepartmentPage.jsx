import Link from "next/link";
import FontAwesomeEmail from "../fontAwesomeClientComponents/Email";
import FontAwesomePhone from "../fontAwesomeClientComponents/Phone";
import Image from "next/image";

export default function DepartmentPage({departmentData, headOfDepartment, headOfDepartmentPhoto, description}) {
    return (
        <main className="container mx-auto px-5 text-[black] font-probapro flex flex-col py-8">
            <h1 className="text-center font-semibold text-2xl text-headerSecond mb-6">
                {departmentData.data.attributes.title ? departmentData.data.attributes.title : departmentData.data.attributes.name}
            </h1>
            <div dangerouslySetInnerHTML={{__html: description}} className="dangerously-set-department"></div>
            
            {departmentData.data.attributes.head_of_department.data && 
            <>
            <h2 className="text-center font-semibold text-2xl text-headerSecond my-6">
                Завідуючий {departmentData.data.attributes.title ? (departmentData.data.attributes.title.toLowerCase().includes('відділення') ? "відділенням" : "відділом") : departmentData.data.attributes.name.toLowerCase().includes('відділення') ? "відділенням" : "відділом"}
            </h2>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col font-probaprosmbd text-headerSecond gap-y-3">
                    <h2 className="text-headerFirst text-xl mb-4 ">{headOfDepartment.name}</h2>
                    {headOfDepartment.contacts.tel && headOfDepartment.contacts.tel.map(tel => <div className="flex flex-row gap-4 items-center">
                        <FontAwesomePhone />
                        <Link href={`tel:${tel}`} style={{letterSpacing: '1px'}}>{tel}</Link>
                    </div>)}
                    <div className="flex flex-row gap-4 items-center">
                        <FontAwesomeEmail />
                        <Link href={`mailto:${headOfDepartment.contacts.email}`}>{headOfDepartment.contacts.email}</Link>
                    </div>
                </div>
                <Image src={`${process.env.STRAPI_URL}${headOfDepartmentPhoto.url}`} width={300} height={400} alt={headOfDepartmentPhoto.name} />
            </div></>}
        </main>
    )
}