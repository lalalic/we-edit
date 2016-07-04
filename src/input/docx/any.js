import React from "react"
export default class Model{
	constructor(srcModel, targetParent){
		let type=srcModel.type
		this.type=type.charAt(0).toUpperCase()+type.substr(1)
		this.wordModel=srcModel
		this.props={}
		this.children=[]
	}
	
	visit(){
		
	}
	
	appendChild(srcModel, targetParent){
		switch(srcModel.type){
		case "section":
		case "paragraph":
		case "inline":
		case "text":
		case "image":
			let appended=new Model(srcModel, this)
			this.children.push(appended)
			return appended
		default:
			return this
		}
	}
	
	createReactElement(namespace){
		let reactClass=namespace[this.type]
		let props=this.props
		switch(this.type){
		case 'Text':
			return React.createElement(reactClass, props, this.wordModel.getText())
		break
		case 'Image':
			let blob=this.wordModel.getImage();
			props.src=URL.createObjectURL(blob,{type:"image/*"})
			props.width=200
			props.height=200
			return React.createElement(reactClass, props)
		default:
			let children=this.children.map(a=>a.createReactElement(namespace))
			return React.createElement(reactClass, props, children)
		break
		}
	}
}