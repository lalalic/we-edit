import {models} from "we-edit"
import {HasParentAndChild,Locatable} from "./composable"

import Document from "./document"
import Template from "./template"
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

export default Locatable.enable(HasParentAndChild.enable(models,{
	Document,
	Template,
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
}))
