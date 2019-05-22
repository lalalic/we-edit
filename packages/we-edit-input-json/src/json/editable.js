import {Readable} from 'stream'
import {Input, ContentQuery} from "we-edit"
import HOCs from "./dom"


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
		name:"We-Edit json document",
		mimeType:"application/json"
	}

	static HOCs=HOCs

	parse({data, ...props}){
		this.props=props
		data=String.fromCharCode.apply(null, new Uint8Array(data))
		this.data=eval(`(a=>a)(${data})`)
		this.data.id="root"
		return {}
	}

	stream(options){
		let data=JSON.stringify(ContentQuery.fromContent(this.doc,"#root").toJS(),(key,value)=>{
			if(key=="type" && value=="text"){
				return undefined
			}
			if(key=="props"){
				if(Object.keys(value).length==0){
					return undefined
				}
			}
			return value
		},4)
		let stream=new Readable({objectMode: true})
		stream.push(data,"uint8array")
		stream.push(null)
		return stream
	}

	render(createElement, components){
		const UnknownComponents={}
		const renderNode=(node,createElement)=>{
			let {children=[], type=typeof(children)=="string"&&"text", props={},}=node
			let TYPE=type[0].toUpperCase()+type.substr(1)
			let Type=components[TYPE]||UnknownComponents[TYPE]
			if(!Type){
				UnknownComponents[TYPE]=Type=class{static displayName=type}
			}
			return createElement(Type,props,
				children.map ? children.map(a=>renderNode(a,createElement)).filter(a=>!!a) : children,
				node)
		}

		//since state is file, don't need render changed
		this.renderNode=node=>node.toJS()

		return renderNode(this.data,createElement)
	}

	getFontList(){
		return []
	}

	static Reducer=class extends Input.Editable.Reducer{
		constructor(state){
			super(...arguments)
			this.file.doc=state.get("_content")
		}
	}
}
