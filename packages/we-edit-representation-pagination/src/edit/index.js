import Models from "../all"

import {editify} from "we-edit"
import recomposable from "./recomposable"

import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Shape from "./shape"
import Table from "./table"
import Row from "./row"

export default Object.keys(Models).reduce((all,k)=>{
		if(!all[k]){
			all[k]=editify(recomposable(Models[k]))
		}
		return all
	},{
		Document,
		Section,
		Paragraph,
		Shape,
		Table,
		Row
})
