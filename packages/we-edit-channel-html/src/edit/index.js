import React from "react"
import Models from "../all"

import {editify} from "we-edit"
import Document from "./document"

function composable(Content){
	return class extends Content{
		render(){
			if(!super.render)
				return null

			let root=super.render()
			if(root && root.type)
				return React.cloneElement(root, {"data-content":this.props.id})
			return root
		}
	}
}

const Editabls=Object.keys(Models).reduce((Editabls, key)=>{
	Editabls[key]=editify(composable(Models[key]))
	return Editabls
},{})




export default {
	...Editabls,
	Document
}
