import dom from ".."

import {editable} from "../../composable"

import Document from "./document"
import Paragraph from "./paragraph"
import Cell from "./cell"

export default editable.enable(dom,{
	Document,
	Paragraph,
	Cell,
})
