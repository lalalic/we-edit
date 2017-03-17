import Models from ".."

import {editable} from "model/edit"
import recomposable from "./recomposable"

const Editabls=Object.keys(Models).reduce((Editabls, key)=>{
	Editabls[key]=editable(recomposable(Models[key]))
	return Editabls
},{})

import Document from "./document"
export default {
	...Editabls,
	Document
}
