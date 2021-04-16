import Unknown from "./component"
import Document from "./document"
import Section from "./section"
import Page from "./page"
import Shape from "./shape"
import Paragraph from "./paragraph"
import Text from "./text"
import Image from "./image"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import Container from "./container"

import Ignore from "./ignore"
import Frame from "./frame"
import Anchor from "./anchor"
import Template from "./template"
import Group from "./group"

const Dom={
	Document,
	Section,
	Page,
	Shape,
	Paragraph,
	Text,
	Image,
	Table,
	Row,
	Cell,
	Container,
}

const Layout={
	Ignore,//content should be ignored
	Group,//don't layout, and append to parent frame
	Frame,//layout engine
	Anchor,//positioning
	Template,//template
}
export default {
	Unknown,//source of any dom
	...Dom,
	...Layout,
}
