import React from "react"
import Content from "../../content"
import {Models} from "."

export default class Model{
	constructor(wordModel, parent){
		this.wordModel=wordModel
		this.type=this.asContentType(wordModel)
		this.props={}
		this.children=[]
	}

	/**
	 * extract information from wordModel
	 */
	visit(){
		this.visitStyle()
	}

	visitStyle(){
		let directStyle=this.wordModel.getDirectStyle()
			,namedStyleId=this.wordModel.getStyleId()

		let style=this.doc.createStyle(el||this.content,namedStyleId)

		if(directStyle)
			directStyle.parse([new this.constructor.StyleProperties(style, this)])

		return style
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
			this.props,
			this.children.map(a=>a.createReactElement(namespace)))
	}
}
