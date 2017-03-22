import React from "react"
import Models from ".."

import {editable} from "model/edit"
import Document from "./document"

function composable(Content){
	return class extends Content{
		render(){
			return React.cloneElement(super.render(), {"data-content":this.props.id})
		}
	}
}

const Editabls=Object.keys(Models).reduce((Editabls, key)=>{
	Editabls[key]=editable(composable(Models[key]))
	return Editabls
},{})




export default {
	...Editabls,
	Document
}