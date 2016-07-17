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

import Any from "../content/any"
import editable from "./editable"

export default {
    '*': editable(Any),
    Document,
    Section,
    Paragraph,
    Inline,
    Text,
    Frame,
    Image,
    Table,
	Row,
	Cell
}
