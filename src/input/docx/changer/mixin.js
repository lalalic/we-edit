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
	this.xml=this.file.officeDocument.content.xml.bind(this.file.officeDocument.content)
}