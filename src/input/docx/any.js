import React from "react"
import Content from "../../content"
import {Models} from "."
import Style from "./style"

export default class Model{
	constructor(wordModel, parent){
		this.wordModel=wordModel
		this.type=this.asContentType(wordModel)
		this.contentProps={}
		this.children=[]
	}

	/**
	 * extract information from wordModel
	 */
	visit(){
		if(this.wordModel.getDirectStyle){
			let style=this.wordModel.getDirectStyle()
			if(style){
				let visitor=new Style()
				style.parse([visitor])
				this.contentProps.contentStyle=visitor.style
				visitor.style.metadata={basedOn:this.wordModel.getStyleId()}
			}
		}
	}

	asContentType(wordModel){
		let type=wordModel.type
		if(type)
			return type.charAt(0).toUpperCase()+type.substr(1)
		else
			return "*"
	}

	appendChild(wordModel){
		let type=this.asContentType(wordModel)
		if(Content[type]){
			let ModelType=Models[type]
			let appended=ModelType ? new ModelType(wordModel,this) : new Model(wordModel, this)
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
}
