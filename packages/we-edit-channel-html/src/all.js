import Models from "we-edit/model"
import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Text from "./text"
import Image from "./image"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"


export default {
	...Models,
	Document, 
	Section, 
	Paragraph, 
	Text,
	Image,
	Table, Row, Cell
}