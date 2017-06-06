export default function mixin(renderChanged){
	this.getNode=(id,part)=>{
		[id,part]=id.split(/[\[\]]/g)
		let node=null

		if(!part)
			node=this.file.officeDocument.content(`#${id}`)
		else
			node=this.file.officeDocument.getRel(part)(`#${id}`)
		console.assert(node.length<2)
		return node
	}
	this._renderChanged=renderChanged

	this.clone=node=>{
		let withIds=node.find("[id]").each((i,el)=>el.attribs._id=el.attribs.id)
		let cloned=node.clone()
		withIds.removeAttr("_id")
		return cloned
	}
	
	this.id=node=>{
		if(node.prop("name")=="w:body")
			return null
		
		return node.attr("id")||node.find("[id]").attr("id")
	}

	this.xml=this.file.officeDocument.content.xml.bind(this.file.officeDocument.content)
}
