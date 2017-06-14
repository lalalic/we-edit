import docx4js from "docx4js"
import uuid from "tools/uuid"

const defineId=(target,id)=>Object.defineProperty(target,"id",{
	enumerable: false,
	configurable: false,
	writable: false,
	value: id
})
export default class loader extends docx4js{
	makeId(node, uid){
		if(uid){
			defineId(node.attribs,uid)
			return uid
		}
		
		if(node.attribs.id!=undefined)
			return node.attribs.id

		let id=uid||uuid()
		defineId(node.attribs,id)

		if(this.part)
			return `${id}[${this.part}]`

		return id
	}
	
	getNode(uid){
		let [id,part]=uid.split(/[\[\]]/g)
		let node=null

		if(!part)
			node=this.officeDocument.content(`#${id}`)
		else
			node=this.officeDocument.getRel(part)(`#${id}`)
		console.assert(node.length<2)
		return node
	}
	
	cloneNode(node){
		let withIds=node.find("[id]").each((i,el)=>el.attribs._id=el.attribs.id)
		let cloned=node.clone()
		withIds.removeAttr("_id")
		return cloned
	}
	
	createNode(props){
		
	}
	
	updateNode({type}){
		return this[`_update${type[0].toUpperCase()+type.substr(1)}Node`](...arguments)
	}
	
	removeNode({id,type}){
		return this.getNode(id).remove()
	}
	
	_updateTextNode({id},{props,children}){
		if(children!=undefined){
			return this.getNode(id).text(children).get(0)
		}else{
			
		}
	}
	
	construct(from,to){
		let nodeFrom=this.getNode(from)
		let nodeTo=this.getNode(to)
		nodeFrom.parentsUntil(nodeTo).map((i,node)=>{
			
		})
	}
}