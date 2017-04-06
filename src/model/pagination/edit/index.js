import Models from ".."

import {editable} from "model/edit"
import recomposable from "./recomposable"

const Editables=Object.keys(Models).reduce((Editables, key)=>{
	Editables[key]=editable(recomposable(Models[key]))
	return Editables
},{})

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import List from "./list"

export default {
	...Editables,
	Document,
	Section,
	Paragraph,
	List
}
