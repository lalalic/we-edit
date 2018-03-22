import Models from "../all"

import {editable} from "we-edit/model"
import recomposable from "./recomposable"

const Editables=Object.keys(Models).reduce((Editables, key)=>{
	Editables[key]=editable(recomposable(Models[key]))
	return Editables
},{})

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import List from "./list"
import Text from "./text"
import Shape from "./shape"

export default {
	...Editables,
	Document,
	Section,
	Paragraph,
	List,
	Text,
	Shape
}
