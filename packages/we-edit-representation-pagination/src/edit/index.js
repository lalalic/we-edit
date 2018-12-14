import Models from "../all"

import editable from "./editable"

import Document from "./document"
import Paragraph from "./paragraph"
import Shape from "./shape"
import Table from "./table"
import Row from "./row"
import Text from "./text"
import Image from "./image"

export default editable.enable(Models,{
	Document,
	Paragraph,
	Shape,
	Table,
	Row,
	Text,
	Image,
})
