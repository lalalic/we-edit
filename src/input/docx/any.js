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
		switch(this.type){
		case 'Image':
			let blob=this.wordModel.getImage();
			this.props.src=URL.createObjectURL(new Blob(blob),{type:"image/*"})
			this.props.width=200
			this.props.height=200
		break
		case 'Text':
			this.children.push(this.wordModel.getText())
		break
		}
	}

	appendChild(srcModel){
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
			return React.createElement(reactClass,props,this.children[0])
		break
		case 'Image':
			return React.createElement(reactClass,props)
		break
		default:
			let children=this.children.map(a=>a.createReactElement(namespace))
			return React.createElement(reactClass, props, children)
		}

	}
}
