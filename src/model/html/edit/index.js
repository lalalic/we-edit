import Models from ".."

import {editable} from "model/edit"

const Editabls=Object.keys(Models).reduce((Editabls, key)=>{
	Editabls[key]=editable(Models[key])
	return Editabls
},{})

export default {
	...Editabls
}
