import React from "react"

export {default as Page} from "./page"
export {default as Section} from "./section"
export {default as Shape} from "./shape"

import ParagraphRibbon from "../paragraph"

export const Paragraph=props=>(<ParagraphRibbon {...props} filter={({indent, spacing})=>({indent,spacing})}/>)
