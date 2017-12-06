import Input from "input"
import uuid from "tools/uuid"
import {getSelection} from "state/selector"
import EditableDocument from "./editable-doc"
import * as reducer from "input/reducer"

export default class extends Input.Type{
	static support(file){
		switch(typeof(file)){
		case "string":
			return file.endsWith(".wed.json") || file.endsWith(".wed.xml")
		case "object":
			if(this.isPlainData(file) && file.type=="document")
				return true
			if(this.isBlob(file) && 
					(
					file.type=="application/json" || 
					file.type=="application/xml" ||
					file.name.endsWith(".wed.json") || 
					file.name.endsWith(".wed.xml")
					))
				return true
		}
	}

	static isPlainData(file){
		return file.children
	}

	load(file){
		switch(typeof(file)){
		case "object":
			if(this.constructor.isPlainData(file) && file.type=="document")
				return new EditableDocument(file)
			if(this.constructor.isBlob(file)){
				return this.constructor.load(file).then(({data,type,name})=>{
					this.name=name
					switch(type||name.split(".").pop()){
						case "json":
							return new EditableDocument(JSON.parse(data))
						case "xml":
							return new EditableDocument(JSON.parse(data))
					}
					
				})
			}
		case "string":
			if(file.endsWith(".json")){
				return new EditableDocument(JSON.parse(require("fs").readFileSync(file)))
			}else if(file.endsWith(".xml"))
				return Promise.resolve(this.loadXML(file))
				.then(doc=>new EditableDocument(doc))
		default:
			throw new Error("not supported format")
		}
	}

	loadXML(file){

	}

	create(){
		return new EditableDocument({
			type:"document",
			children:[{
				type:"section",
				children:[{
					type:"paragraph",
					children:[{
						type:"text",
						children:"hello, have fun"
					}]
				}]
			}]
		})
	}

	serialize(){
		return this.doc.serialize()
	}


	render(createElement, components){
		const renderNode=(node,createElement)=>{
			let {type,props,children=[]}=node
			let Type=components[type[0].toUpperCase()+type.substr(1)]
			if(!Type)
				return null
			return createElement(Type,props,
				children.map ? children.map(a=>renderNode(a,createElement)) : children,
				node)
		}

		this.renderNode=renderNode

		return renderNode(this.doc.root,createElement)
	}

	makeId(node){
		return this.doc.makeId(node)
	}
	
	onChange(state,{type,payload},createElement){
		let params=[state]
		switch(type){
			case 'we-edit/style/text/bold':
				return new reducer.document(...params)
					.update({bold:payload})
					.state()
		}
		return super.onChange(...arguments)
	}
}
