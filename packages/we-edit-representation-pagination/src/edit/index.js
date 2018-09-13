import Models from "../all"

import {editify} from "we-edit"
import recomposable from "./recomposable"

const Editables=Object.keys(Models).reduce((Editables, key)=>{
	Editables[key]=editify(recomposable(Models[key]))
	return Editables
},{})

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Text from "./text"
import Shape from "./shape"
import Table from "./table"
import Row from "./row"

export default {
	...Editables,
	Document,
	Section,
	Paragraph,
	Text,
	Shape,
	Table,
	Row,
}
