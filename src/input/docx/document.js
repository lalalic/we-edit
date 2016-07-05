import Model from "./any"
import React from "react"
import Style from "./style"
import immutable from "immutable"

export default class extends Model{
	constructor(){
		super(...arguments)
		this.contentProps.documentStyles={}
	}

	addStyle(wordModel){
		let styleVisitor=new Style(wordModel, this)
		this.contentProps.documentStyles[wordModel.id]=styleVisitor.style
		return styleVisitor
	}

	cloneStyle(id){
		let style=this.contentProps.documentStyles[id]
		style=JSON.parse(JSON.stringify(style))
		delete style.metadata
		return style
	}

	getDefaultStyle(type){
		let styles=this.contentProps.documentStyles
		let id=Object.keys(styles).find(a=>{
			let meta=styles[a].metadata
			return meta.type==type && meta.isDefault
		})

		return styles[id]
	}
}
