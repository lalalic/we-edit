import Input from "input"
import uuid from "tools/uuid"
import {getSelection} from "state/selector"
import EditableDocument from "./editable-doc"

export default class extends Input.Type{
	static support(file){
		switch(typeof(file)){
		case "object":
			return file.type=="document"
		case "string":
			return file.endsWith(".wed.json") || file.endsWith(".wed.xml")
		}
	}
	
	load(file){
		switch(typeof(file)){
		case "object":
			return new EditableDocument(file)
		case "string":
			if(file.endsWith(".json"))
				return new EditableDocument(require(file))
			else if(file.endsWith(".xml"))
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
	
	serialize(name, option){
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
}