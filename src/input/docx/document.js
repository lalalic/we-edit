import Model from "./any"
import React from "react"
import Style from "./style"
import immutable from "immutable"

export default class extends Model{
	constructor(){
		super(...arguments)
		this.documentStyles=new Map()
	}
	
	addStyle(wordModel){
		let styleVisitor=new Style(wordModel, this)
		this.documentStyles.set(wordModel.id, styleVisitor.style)
		return styleVisitor
	}
	
	cloneStyle(name){
		let style=this.documentStyles.get(name)
		style=JSON.parse(JSON.stringify(style))
		delete style.metadata
		return style
	}
}