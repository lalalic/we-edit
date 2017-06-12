import docx4js from "docx4js"
import uuid from "tools/uuid"

export default class loader extends docx4js{
	makeId(node, uid){
		if(node.attribs.id!=undefined)
			return node.attribs.id

		let id=uid||uuid()
		Object.defineProperty(node.attribs,"id",{
			enumerable: false,
			configurable: false,
			writable: false,
			value: id
		})

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
	
	getId(node){
		if(node.prop("name")=="w:body")
			return null
		
		return node.attr("id")||node.find("[id]").attr("id")
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
	
	removeNode(content){
		
	}
	
	_updateTextNode({id},{props,children}){
		if(children!=undefined){
			return this.getNode(id).text(children).get(0)
		}else{
			
		}
	}
}