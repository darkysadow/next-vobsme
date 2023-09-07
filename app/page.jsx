import AllNews from "@/components/News/News";
import { Suspense } from "react";


export default function Home() {
  return (
    <main className="text-[black] font-probapro text-xl py-4">
      <Suspense fallback={<div className="container mx-auto py-[50px] text-center text-headerSecond font-probapro text-2xl">Завантаження</div>}>
        <div className="container mx-auto px-5">
          <h1>Новини</h1>
          <AllNews />
        </div>
      </Suspense>
    </main>
  )
}
