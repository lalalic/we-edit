import React from "react"
import Content from "../../content"
import {Models} from "."
import Style from "./style"

export default class Model{
	constructor(wordModel, doc){
		this.wordModel=wordModel
		this.type=this.asContentType(wordModel)
		this.contentProps={}
		this.children=[]
		this.doc=doc
	}

	/**
	 * extract information from wordModel
	 */
	visit(){
		if(this.wordModel.getDirectStyle){
			let style=this.wordModel.getDirectStyle()
			if(style){
				let visitor=new Style(this.wordModel, this.doc)
				style.parse([visitor])
				this.contentProps.contentStyle=visitor.style
			}else{
				this.contentProps.contentStyle=this.doc.getDefaultStyle(this.wordModel.type)
			}
		}
	}

	asContentType(wordModel){
		let type=wordModel.type
		if(!type)
			return '*'
		
		type=type.charAt(0).toUpperCase()+type.substr(1)
		switch(type){
		case 'Heading':
			return 'Paragraph'
		default:
			return type
		}
	}

	appendChild(wordModel,doc){
		let type=this.asContentType(wordModel)
		if(Content[type]){
			let ModelType=Models[type]
			let appended=ModelType ? new ModelType(wordModel,doc) : new Model(wordModel, doc)
			this.children.push(appended)
			return appended
		} else
			return this
	}

	/**
	 * you'd better NOT extract info from wordModel
	 * Maybe error since parse context is released
	 */
	createReactElement(namespace){
		return React.createElement(
			namespace[this.type],
			this.contentProps,
			this.children.map(a=>a.createReactElement(namespace)))
	}
	
	toTag(){
		return `<${this.type}>${this.children.map(a=>a.toTag()).join("")}</${this.type}>`
	}
}
