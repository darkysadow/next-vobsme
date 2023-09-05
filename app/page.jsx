import AllNews from "@/components/News/News";


export default function Home() {
  return (
    <main className="text-[black] font-probapro text-xl py-4">
      <div className="container mx-auto px-5">
        <h1>Новини</h1>
        <AllNews />
      </div>
      
    </main>
  )
}
