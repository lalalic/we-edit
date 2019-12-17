import dom from ".."

import {editable} from "../../composable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Row from "./row"
import Cell from "./cell"

export default editable.enable(dom,{
	Document,
	//Section,
	Paragraph,
	//Row,
	//Cell,
})
