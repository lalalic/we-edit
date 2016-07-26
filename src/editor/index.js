import editable from "./editable"
import Any from "../content/any"
import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Inline from "./inline"
import Text from "./text"
import Frame from "./frame"
import Image from "./image"
import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import List from "./list"
import Header from "./header"
import Footer from "./footer"


export default {
	Any: editable(Any),
    Document,
    Section,
    Paragraph,
    Inline,
    Text,
    Frame,
    Image,
    Table,
	Row,
	Cell,
    List,
	Header,
	Footer
}
