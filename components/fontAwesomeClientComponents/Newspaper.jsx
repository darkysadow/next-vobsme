'use client'


import { faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default function FontAwesomeNewspaper(props) {
    return (
        <FontAwesomeIcon size="1x" className="w-[100px] h-auto" icon={faNewspaper} {...props} />
    )
}

{/* <FontAwesomeIcon size="2xl" icon={faNewspaper} {...props} /> */}