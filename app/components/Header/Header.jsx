"use client"

import React, { useEffect, useRef, useState } from "react";
import s from './../header.module.css'
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const [openedTab, setOpenedTab] = useState(undefined)
    const [prevTab, setPrevTab] = useState(undefined)
    const router = useRouter()
    const navigate = (path) => {
        router.push(path)
    }
    const headerNavStaticState = [
        {
            link: '1',
            text: 'Історія бюро',
            subcategory: 'Про нас',
            category: 'ВОБ СМЕ'
        },
        {
            link: '2',
            text: 'Фотогалерея',
            subcategory: 'Про нас',
            category: 'ВОБ СМЕ'
        },
        {
            link: '3',
            text: 'Наші ветерани',
            subcategory: 'Про нас',
            category: 'ВОБ СМЕ'
        },
        {
            link: '4',
            text: 'Начальник бюро',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '5',
            text: 'Адміністрація бюро',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddil-sme-trupiv',
            text: 'Відділ СМЕ трупів',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddil-komisiinykh-sme',
            text: 'Відділ комісійних СМЕ',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddil-sme-poterpilykh',
            text: 'Відділ СМЕ потерпілих',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/mizhraionni-viddilennia',
            text: 'Міжрайонні відділення',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-sudovo-medychnoi-kryminalistyky',
            text: 'Відділення СМ криміналістики',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-sm-toksykolohii',
            text: 'Відділення СМ токсикології',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-sm-histolohii',
            text: 'Відділення СМ гістології',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-sm-imunolohii',
            text: 'Відділення СМ імунології',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-sm-tsytolohii',
            text: 'Відділення СМ цитології',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '/departments/viddilennia-cherhovykh-sm-ekspertiv',
            text: 'Відділення чергових СМ експертів',
            subcategory: 'Структура бюро',
            category: 'ВОБ СМЕ'
        },
        {
            link: '16',
            text: 'Загальні положення',
            subcategory: 'Інформація',
            category: 'Інформація'
        },
        {
            link: '17',
            text: 'Нормативна база',
            subcategory: 'Інформація',
            category: 'Інформація'
        },
        {
            link: '19',
            text: 'Публічна інформація',
            subcategory: 'Інформація',
            category: 'Інформація'
        },
        {
            link: '20',
            text: 'Для слідчих',
            subcategory: 'Інформація',
            category: 'Інформація'
        },
        {
            link: '21',
            text: 'Інформація за 2021 рік',
            subcategory: 'Фінансова діяльність',
            category: 'Інформація'
        },
        {
            link: '22',
            text: 'Інформація за 2022 рік',
            subcategory: 'Фінансова діяльність',
            category: 'Інформація'
        },
        {
            link: '23',
            text: 'Інформація за 2023 рік',
            subcategory: 'Фінансова діяльність',
            category: 'Інформація'
        },
        {
            link: '24',
            text: 'Кошторис',
            subcategory: 'Фінансова діяльність',
            category: 'Інформація'
        },
        {
            link: '25',
            text: 'Мапа сайту',
            subcategory: 'Мапа сайту',
            category: 'Інформація'
        }

    ]

    const filteredObjects = headerNavStaticState.filter(
        (item) => item.category === openedTab
    );
    const subcategories = Array.from(new Set(filteredObjects.map(item => item.subcategory)));
    const isActiveTab = (e) => {
        return openedTab === e.target.childNodes[0].data;
    }

    const changeOpenedTab = (e) => {
        if (!e) {
            setOpenedTab(undefined)
            setPrevTab(undefined)
        } else {

            if (prevTab === e.target.childNodes[0].data) {
                setOpenedTab(undefined)
                setPrevTab(undefined)
            } else {
                setOpenedTab(e.target.childNodes[0].data)
                setPrevTab(e.target.childNodes[0].data)
            }

        }
    }
    return (
        <header>
            <div className='bg-headerFirst bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4478d7] to-headerFirst'>
                <div className="container mx-auto">
                    <div className='flex w-full justify-center items-center flex-col pt-5 pb-6 gap-3'>
                        <div className='w-[110px] h-[110px]'>
                            <img src={'/FTOWHITE.png'} className='w-full h-full' alt="" />
                        </div>
                        <div className='font-probapro text-[1.5rem] leading-[1.2em] font-bold tracking-[3px] pb-1 font-variant-small-caps text-white text-center'>
                            <h1>Вінницьке обласне бюро судово-медичної експертизи</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.header__bottom__wrapper}>
                <div className="bg-headerSecond relative z-10">
                    <div className="container mx-auto">
                        <nav className='w-full flex flex-row justify-center items-center relative px-2'>
                            <ul className="h-16 flex flex-row justify-between items-center text-white w-full font-probapro text-lg leading-6 font-semibold antialiased text-center">
                                <li className={openedTab === "Головна" ? `${'nav-li-style'} ${'nav-li-style-active'}` : `${'nav-li-style'}`} onClick={(e) => { navigate('/'); setOpenedTab(undefined) }}>
                                    Головна
                                </li>
                                <li className={openedTab === "ВОБ СМЕ" ? `${'nav-li-style'} ${'nav-li-style-active'}` : `${'nav-li-style'}`} onClick={(e) => changeOpenedTab(e)}>
                                    ВОБ СМЕ
                                </li>
                                <li className={openedTab === "Інформація" ? `${'nav-li-style'} ${'nav-li-style-active'}` : `${'nav-li-style'}`} onClick={(e) => changeOpenedTab(e)}>
                                    Інформація
                                </li>
                                <li className={openedTab === "Контакти" ? `${'nav-li-style'} ${'nav-li-style-active'}` : `${'nav-li-style'}`} onClick={(e) => changeOpenedTab(e)}>
                                    Контакти
                                </li>
                                <li className={openedTab === "Кафедра" ? `${'nav-li-style'} ${'nav-li-style-active'}` : `${'nav-li-style'}`} onClick={(e) => { window.location.href = 'https://www.vnmu.edu.ua/department/department/58';; setOpenedTab(undefined) }}>
                                    Кафедра
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={openedTab !== undefined ? `${'hidden absolute'} ${'header__bottom__details__active'}` : `${'hidden absolute'}`}>
                        <div className="container mx-auto px-4">
                            <div className='flex flex-row gap-10'>
                                {openedTab !== 'Контакти' ? subcategories.map((subcategory) => (
                                    <div key={subcategory}>
                                        <h3 className="text-xl">{subcategory}</h3>
                                        <ul className="mt-5 ml-5 flex flex-col gap-3 max-h-[200px] flex-wrap">
                                            {filteredObjects
                                                .filter((item) => item.subcategory === subcategory)
                                                .map((item) => (
                                                    <li className='topic' key={item.link} onClick={() => { navigate(item.link); setOpenedTab(undefined) }}><p>{item.text}</p></li>
                                                ))}
                                        </ul>
                                    </div>
                                )) :
                                    <div className='flex flex-row justify-evenly w-full'>
                                        <div>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.5129444067893!2d28.476154676577178!3d49.22876337138476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d5b718250cbd5%3A0xe049f50b59eb2eb!2z0LLRg9C70LjRhtGPINCT0LvRltCx0LAg0KPRgdC_0LXQvdGB0YzQutC-0LPQviwgODMsINCS0ZbQvdC90LjRhtGPLCDQktGW0L3QvdC40YbRjNC60LAg0L7QsdC70LDRgdGC0YwsIDIxMDAw!5e0!3m2!1suk!2sua!4v1687854357312!5m2!1suk!2sua"
                                                width="400"
                                                height="300"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                referrerPolicy="no-referrer-when-downgrade"
                                            >
                                                <img src={'/logoWhiteTest.png'} alt="" />
                                            </iframe>
                                        </div>
                                        <div>
                                            <ul className="flex flex-col gap-4">
                                                <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon icon={faPhone} color="#f8ffff" /><a href="tel:0432552880" className="text-base text-[#f8ffff]">(0432)55-28-80</a></li>
                                                <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon icon={faEnvelope} color="#f8ffff" /><a href="mailto:oblsme_vin@ukr.net" className="text-base text-[#f8ffff]">oblsme_vin@ukr.net</a></li>
                                                <li className="flex flex-row gap-3 items-center justify-start"><FontAwesomeIcon icon={faLocationDot} color="#f8ffff" />м.Вінниця, вул. Г.Успенського, 83</li>
                                            </ul>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {openedTab !== undefined &&
                <div className='w-full h-screen fixed z-[2] top-0 left-0' onClick={() => setOpenedTab(undefined)}>
                </div>}

        </header>

    )
}

export default Header;