import Model from "./any"
import React from "react"
import Style from "./style"
import immutable from "immutable"

export default class extends Model{
	constructor(){
		super(...arguments)
		this.contentProps.documentStyles=new Styles()
	}

	addStyle(wordModel){
		let styleVisitor=new Style(wordModel, this)
		if(wordModel.id)
			this.contentProps.documentStyles[wordModel.id]=styleVisitor.style
		else
			this.contentProps.contentStyle=styleVisitor.style

		return styleVisitor
	}

	createStyle(){
		return this.contentProps.documentStyles.createStyle()
	}

	getTypeDefaultStyleId(type){
		return this.contentProps.documentStyles.getDefault(type).metadata.id
	}
}

class Styles{
	getDefault(type){
		let styles=this
		let id=Object.keys(styles).find(a=>{
			let meta=styles[a].metadata
			if(!meta)
				return false
			else
				return meta.type==type && meta.isDefault
		})
		return styles[id]
	}

	createStyle(){
		return new StyleInfo(this)
	}
}

class StyleInfo{
	constructor(styles){
		this.styles=styles
	}

	get(path){
		let value=path.split(".").reduce((p,key)=>p ? p[key] : p,this)
		if(value==undefined){
			const {basedOn}=this.metadata
			if(basedOn){
				switch(typeof(basedOn)){
				case 'string':
					return this.styles[basedOn].get(path)
				case 'object':
					return basedOn.get(path)
				}
			}
		}
		return value
	}
}
