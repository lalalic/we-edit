import {editify} from "we-edit"
import Editables, {editable} from "we-edit-representation-html/edit"

import models from "../all"

import Paragraph from "./paragraph"
import Text from "./text"

const all={...models, Paragraph,Text}

export default Object.keys(all)
	.reduce((converted,k)=>{
		if(converted[k]===undefined)
			converted[k]=editify(editable(all[k]))
		return converted
	},{Document:Editables.Document})