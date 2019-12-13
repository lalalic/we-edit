import dom from ".."

import {editable} from "../../composable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Shape from "./shape"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import Text from "./text"
import Image from "./image"
import Frame from "./frame"
import Template from "./template"

export default editable.enable(dom,{
	Document,
	Section,
	Paragraph,
	Frame,
	Shape,
	Table,
	Row,
	Cell,
	Text,
	Image,
	Template,
})
