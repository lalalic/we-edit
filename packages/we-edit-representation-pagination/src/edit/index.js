import Models from "../all"

import editable from "./editable"

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
import Anchor from "./anchor"

export default editable.enable(Models,{
	Document,
	Section,
	Paragraph,
	Frame,
//	Shape,
	Table,
	Row,
	Cell,
	Text,
	Image,
	Anchor,
})
