import Model from "./any"
import React from "react"
import Style from "./style"
import immutable from "immutable"

export default class extends Model{
	constructor(){
		super(...arguments)
		this.contentProps.documentStyles={
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
		}
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

	cloneDocumentDefaultStyle(){
		return this.cloneStyle()
	}

	cloneDefaultStyle(type){
		return this.cloneStyle(this.contentProps.documentStyles.getDefault(type).metadata.id)
	}
}
