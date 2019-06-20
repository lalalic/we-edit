import {Readable} from 'stream'
import cheer from "cheerio"
import {Parser, DomHandler} from "htmlparser2"
import {transactifyCheerio,Input} from "we-edit"
import Reducer from "./event"
import Dom from "./render"

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
	
	static Reducer=Reducer
	static HOCs=Dom
    
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
		const doc=cheer.load(this.dataToDom(data),{xmlMode:true,decodeEntities: false})
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
			const {children, name:type, attribs:props, isText=type=="text"}=node
			debugger
			const TYPE=isText ? "Text" : type[0].toUpperCase()+type.substr(1)
			let Type=components[TYPE]||UnknownComponents[TYPE]
			if(!Type){
				UnknownComponents[TYPE]=Type=class{static displayName=type}
			}
			return createElement(Type,props||{},
				isText ? (!Array.isArray(children) ? children.data : (children[0]||{}).data) : 
					(Array.isArray(children) ? children.map(a=>renderNode(a,createElement)).filter(a=>!!a) : 
						(!!children ? renderNode(a,createElement) : children)
					),
				node)
		}

		this.renderNode=(node,createElement)=>renderNode(this._unwrap(node),createElement)

		return renderNode(this.doc.root().children().get(0),createElement)
	}

	_unwrap(n){
		return n && ("cheerio" in n) && n.get(0) || n
	}
	
	makeId(node, uid){
		if(!node){
			debugger
		}

		node=this._unwrap(node)

		if(uid){
			defineId(node.attribs,uid)
			return uid
		}

		if(node.attribs.xxid){
			return node.attribs.xxid
		}

		const id=uid||(node.name=="document"&&"root")||super.makeId()
		defineId(node.attribs,id)

		return id
	}

	getNode(id){
		const node=this.doc(`[xxid="${id}"]`)

		if(node.length!=1){
			debugger
			throw new Error(`can't find node[id=${uid}]`)
		}
		return node
	}

	$(){
		return this.doc(...arguments)
	}
}

class ContentDomHandler extends DomHandler{
	_addDomElement(el){
		if(el.type=="text" && (el.data[0]=='\r' || el.data[0]=='\n'))
			;//remove format whitespaces
		else
			return super._addDomElement(el)
	}
}


const defineId=(target,id)=>Object.defineProperty(target,"xxid",{
	enumerable: false,
	configurable: true,
	writable: false,
	value: id
})