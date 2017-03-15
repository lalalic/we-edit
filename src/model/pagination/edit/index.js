import Models from ".."
import editable from "./editable"
import Cursor from "./cursor"

const Editabls=Object.keys(Models).reduce((Editabls, key)=>{
	Editabls[key]=editable(Models[key])
	return Editabls
},{})

export default {
	...Editabls,
	Cursor
}
