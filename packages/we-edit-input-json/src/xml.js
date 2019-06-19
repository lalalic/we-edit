import {Readable} from 'stream'
import cheer from "cheerio"
import {Parser, DomHandler} from "htmlparser2"
import {transactifyCheerio,Input} from "./json/node_modules/we-edit"
import Reducer from "./event"

export default class extends Input.Editable{
    static support(file){
		if(!file)//for installer
			return true

		const {data, name, ext, type}=file
		if(ext && ext=="xml")
			return true

		if(name && name.endsWith(".xml"))
			return true

		if(type && type=="document")
			return true
		return false
	}

	static defaultProps={
		type:"xml",
		ext:"xml",
		name:"We-Edit XML document",
		mimeType:"application/xml"
    }
    
    dataToDom(data){
        const handler=new ContentDomHandler({xmlMode:true,decodeEntities: false})
        new Parser(handler,opt).end(data)
        return handler.dom
    }

    nodeToString(node){
        return node.toXml()
    }

    parse({data, ...props}){
		this.props=props
		const doc=cheer.load(this.dataToDom(),{xmlMode:true,decodeEntities: false})
		transactifyCheerio(doc)
		return doc
	}

	stream(){
		const stream=new Readable()
		stream.push(this.nodeToString(this.doc.root()))
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

		this.renderNode=node=>renderNode(node,createElement)

		return renderNode(this.doc,createElement)
    }
    
    static Reducer=Reducer
}

class ContentDomHandler extends DomHandler{
	_addDomElement(el){
		if(el.type=="text" && (el.data[0]=='\r' || el.data[0]=='\n'))
			;//remove format whitespaces
		else
			return super._addDomElement(el)
	}
}
