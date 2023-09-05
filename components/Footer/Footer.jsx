import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-auto py-4text-[black] w-full relative before:absolute before:h-[1px] before:w-[90%] before:left-[5%] before:top-0 before:bg-headerFirst before:opacity-20">
            <div className="container mx-auto px-5 flex flex-row max-md:flex-col py-5 justify-between max-md:space-y-5">
                <div className="w-[60%] max-md:w-full">
                    <div className="flex flex-row flex-wrap gap-4 max-md:justify-center max-md:gap-4 max-md:items-center text-[gray]">
                        <Link href='/finances' className="hover:underline">Інформація про фінансову діяльність</Link>
                        <Link href='/public' className="hover:underline">Публічна інформація</Link>
                        <Link href='/structure' className="hover:underline">Структура закладу</Link>
                        <a href='https://www.vnmu.edu.ua/department/department/58' className="hover:underline">Кафедра судової медицини та права</a>
                    </div>
                </div>
                <div className="w-[38%] text-[black] max-md:w-full">
                    <div className="beta">
                    Портал працює у тестовому режимі. Окремі функції можуть не працювати. Якщо ви маєте зауваження або пропозиції, будь ласка, напишіть нам: <a href="mailto:oblsme_vin@ukr.net">oblsme_vin@ukr.net</a>
                    </div>
                    <div className="cc">
                    Весь контент доступний за ліцензією <a href="https://creativecommons.org/licenses/by/4.0/deed.uk">Creative Commons Attribution 4.0 International license</a>, якщо не зазначено інше
                    </div>
                </div>
            </div>
            <div className="w-full bg-slate-200 text-xs font-probapro text-center text-[gray] py-5 ">© ВОБСМЕ 2023</div>
        </footer>
    )
}

export default Footer;