import {Readable} from 'stream'
import XMLDocument from "./xml"

export default class extends XMLDocument{
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

    dataToDom(data){
        data=String.fromCharCode.apply(null, new Uint8Array(data))
        data=eval(`(a=>a)(${data})`)
        const toNode=({children,type:name, props:attribs={}})=>{
            return {attribs, name, children:children.map(toNode)}
        }
        
        const root=toNode(data)

        const connect=(a,parent)=>{
            const siblings=parent.children
            const i=siblings.indexOf(a)
            return Object.assign(a, {
                parent,
                prev:siblings[i-1],
                next:siblings[i+1],
                children:a.children.map(b=>connect(b,a))
            })
        }
        return connect(dom)
    }

    nodeToString(node){
        const toObject=({name:type,attribs:props,children})=>{
            return {type,props,children:children.map(toObject)}
        }
        const data=toObject(node)
        return JSON.stringify(data,(key,value)=>{
			return value
		},4)
    }
}