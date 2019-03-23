import {Readable} from 'stream'
import {Input} from "we-edit"


export default class EditableDocument extends Input.Editable{
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
		this.data=eval(`(a=>a)(${data})`)
		this.data.id="root"
		return {}
	}

	stream(options){
		let data=JSON.stringify(this.doc, (k,v)=>k=="id" ? undefined : v, "\t")
		let stream=new Readable({objectMode: true})
		stream.push(data,"uint8array")
		return stream
	}

	render(createElement, components){
		const renderNode=(node,createElement)=>{
			let {type,props,children=[]}=node
			let Type=components[type[0].toUpperCase()+type.substr(1)]
			if(!Type){
				Type=class{static displayName=type}
			}
			return createElement(Type,props,
				children.map ? children.map(a=>renderNode(a,createElement)).filter(a=>!!a) : children,
				node)
		}

		this.renderNode=renderNode

		return renderNode(this.data,createElement)
	}

	getFontList(){

	}

	static Reducer=class extends Input.Editable.Reducer{
		constructor(state){
			super(...arguments)
			this.file.doc=state.get("_content")
		}
	}
}