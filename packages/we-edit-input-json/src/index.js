import {Input} from "we-edit"
import {Readable} from 'stream'
import EditableDocument from "./editable-doc"

export default class JSONType extends Input.Editable{
	static support(file){
		if(!file)//for installer
			return true

		const {data, name, ext, type}=file
		if(ext && ext=="wed.json")
			return true

		if(name && name.endsWith(".wed.json"))
			return true

		if(type && type=="document")
			return true
		return false
	}

	static defaultProps={
		type:"json",
		ext:"json",
		name:"We-Edit document",
		mimeType:"application/json"
	}

	parse({data, ...props}){
		this.props=props
		data=String.fromCharCode.apply(null, new Uint8Array(data))
		return new EditableDocument(JSON.parse(data))
	}

	stream(options){
		let data=this.doc.serialize(options)
		let stream=new Readable({objectMode: true})
		stream.push(data,"uint8array")
		return stream
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
