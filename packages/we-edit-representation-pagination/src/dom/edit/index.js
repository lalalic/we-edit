import dom from ".."

import {editable} from "../../composable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import Text from "./text"

export default editable.enable(dom,{
	Document,
	Section,
	Paragraph,
	Table,
	Row,
	Cell,
	Text,
})
