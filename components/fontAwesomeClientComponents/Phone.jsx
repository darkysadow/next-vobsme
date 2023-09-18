"use client"

import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false


export default function FontAwesomePhone() {
    return (
        < FontAwesomeIcon icon={faPhone} className="w-[22px]" color="#1b3f85"/>
    )
}