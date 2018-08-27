import React from "react"
import PropTypes from "prop-types"

import Models from "../all"

import {editify} from "we-edit"
import Document from "./document"

export function editable(Content){
	return class extends Content{
		static contextTypes={
			...Content.contextTypes,
			mount: PropTypes.func,
		}
		
		constructor(){
			super(...arguments)
			if(this.context.mount)
				this.context.mount(this)
		}
		
		render(){
			if(!super.render)
				return null

			let root=super.render()
			if(root && root.type)
				return React.cloneElement(root, {
					"data-content":this.props.id, 
					"data-type":this.constructor.displayName.split("-").pop()
				})
			return root
		}
	}
}

const all={...Models}

export default Object.keys(all)
	.reduce((Editables, key)=>{
		if(!Editables[key]){
			Editables[key]=editify(editable(all[key]))
		}
		return Editables
	},{Document})
