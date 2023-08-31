export default function Department({params}) {
    console.log(params.department);
    return (<div className="text-[black]">Department {params.department}</div>)
}