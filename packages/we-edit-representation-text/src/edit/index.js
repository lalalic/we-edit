import {editify} from "we-edit"
import models from "../all"

import Document from  "./document"
import Paragraph from "./paragraph"

export default Object.keys(models).reduce((converted,k)=>{
	if(converted[k]===undefined)
		converted[k]=editify(models[k])
	return converted
},{
	Document,
	Paragraph,
})