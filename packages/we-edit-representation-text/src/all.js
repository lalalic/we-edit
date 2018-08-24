import React, {Fragment} from "react"

import {models} from "we-edit"
import Document from "./document"
import Paragraph from "./paragraph"
import Text from  "./text"

function textify(Model){
	return class extends Model{
		render(){
			return <Fragment>{this.props.children}</Fragment>
		}
	}
}

export default Object.keys(models).reduce((converted,k)=>{
	if(converted[k]===undefined){
		converted[k]=textify(models[k])
	}
	return converted
},{
	Document,
	Paragraph,
	Text,
	
})