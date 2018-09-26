import Models from "../all"

import recomposable from "./recomposable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Shape from "./shape"
import Table from "./table"
import Row from "./row"
import Container from "./container"
import Text from "./text"
import Image from "./image"

export default recomposable.enable(Models,{
	Document,
	Section,
	Paragraph,
	Shape,
	Table,
	Row,
	Container,
	Text,
	Image,
})
