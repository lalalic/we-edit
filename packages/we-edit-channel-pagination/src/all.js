import {models} from "we-edit"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Text from "./text"
import Header from "./header"
import Footer from "./footer"
import Image from "./image"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import List from "./list"
import Frame from "./frame"
import Shape from "./shape"

export default {
	...models,
	Document, 
	Section, 
	Paragraph, 
	Text, 
	Header, 
	Footer, 
	Image,
	Table,
	Row,
	Cell,
	List,
	Frame,
	Shape
}
