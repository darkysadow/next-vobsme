"use client"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

 

export default function FontAwesomeEmail() {
    return (
        <FontAwesomeIcon className="w-[22px]" icon={faEnvelope} />
    )
}