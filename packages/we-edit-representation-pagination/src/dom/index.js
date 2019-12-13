import {dom} from "we-edit"
import {HasParentAndChild,Locatable} from "../composable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Text from "./text"
import Image from "./image"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import Frame from "./frame"
import Anchor from "./anchor"
import Shape from "./shape"
import Container from "./container"
import Template from "./template"

export default Locatable.enable(HasParentAndChild.enable(dom,{
	Document,
	Section,
	Paragraph,
	Text,

	Image,
	Table,
	Row,
	Cell,
	Frame,
	Shape,
	Anchor,
	Container,
	Template,
}))
