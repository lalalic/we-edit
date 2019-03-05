
import editors from "./model/edit"
import EditableDocx from "./editable"

export default class SerializableDocx extends EditableDocx{
	makeId(node, uid){
		if(!node){
			debugger
		}
		if(uid){
			defineId(node.attribs,uid)
			return uid
		}

		if(node.attribs.xxid){
			return node.attribs.xxid
		}

		let id=uid||(node.name=="w:document"&&"root")||uuid()
		defineId(node.attribs,id)

		if(this.doc.part)
			return `${id}[${this.doc.part}]`

		return id
	}

	getNode(uid){
		let [id,part]=uid.split(/[\[\]]/g)
		let node=null

		if(!part)
			node=this.doc.officeDocument.content(`[xxid="${id}"]`)
		else
			node=this.doc.officeDocument.getRel(part)(`[xxid="${id}"]`)

		if(node.length!=1){
			debugger
		}
		return node
	}

	cloneNode({id,type}, keepId=false){
		const autoAttach=true//always
		const editor=new editors[Type(type)](this)
		editor.node=this.getNode(id)

		const cloned=editor.clone()

		if(!keepId){
			cloned.find("[xxid]").add(cloned.filter("[xxid]")).removeAttr("xxid")
			if(autoAttach){
				this.attach(cloned)
				return cloned.get(0)
			}
		}

		return cloned
	}

	splitNode({id,type, node},at, firstKeepId=true){
		const editor=new editors[Type(type)](this)
		editor.node=node||this.getNode(id)
		return editor.split(at,firstKeepId)
	}

	createNode({type},position){
		const editor=new editors[Type(type)](this)
		return editor.create(...arguments)
	}

	updateNode({id,type},changing){
		const editor=new editors[Type(type)](this)
		editor.node=this.getNode(id)
		return editor.update(...arguments)
	}

	removeNode({id,type}){
		const editor=new editors[Type(type)](this)
		editor.node=this.getNode(id)
		return editor.remove(...arguments)
	}

	insertNodeBefore(newNode,referenceNode,parentNode){
		if(referenceNode)
			referenceNode.before(newNode)
		else if(parentNode)
			parentNode.append(newNode)
		else
			throw new Error("not support")
	}

	insertNodeAfter(newNode,referenceNode,parentNode){
		if(referenceNode)
			referenceNode.after(newNode)
		else if(parentNode)
			parentNode.prepend(newNode)
		else
			throw new Error("not support")
	}

	attach(xml, needRender=true){
		xml=this.doc.officeDocument.content(xml)
		this.doc.officeDocument.content("w\\:body").append(xml)
		return needRender ? this.renderChanged(xml).id : this.makeId(xml.get(0))
	}

	construct({id:from,type},to){
		const $=this.doc.officeDocument.content
		const cloned=this.getNode(to).clone()
		var clonedFrom=$(cloned).find(`[xxid="${from}"]`)
		if(clonedFrom.length==0){
			console.assert(from==to)
			clonedFrom=cloned
		}

		const editor=new editors[Type(type)](this)
		editor.node=clonedFrom
		editor.empty()

		var current=clonedFrom
		while(current.length){
			current.prevAll().remove()
			current.nextAll().remove()
			current.removeAttr('xxid')
			current=current.closest(`[xxid]`)
		}
		return this.attach(cloned)
	}

    toString(id){
		return this.doc.officeDocument.content.xml(this.getNode(id))
	}

	toXml(node){
		return this.doc.officeDocument.content.xml(node)
	}

    px2dxa(w){
        return w*72*20/96
    }

	px2cm(px){
		return Math.ceil(px*72/96*360000/28.3464567)
	}

	px2Pt(px){
		return px*72/96
	}
}


const uuid=(_uuid=>()=>`${_uuid++}`)(100)

const defineId=(target,id)=>Object.defineProperty(target,"xxid",{
	enumerable: true,
	configurable: true,
	writable: false,
	value: id
})

const Type=type=>{
	type=type[0].toUpperCase()+type.substr(1)
	if(!editors[type])
		return "Unknown"
	return type
}
