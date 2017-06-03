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
	this.renderChanged=renderChanged

	this.withIdClone=node=>{
		return node.clone()
		let cloned=node.clone()
		const getPath=(n,parents=[])=>{
			if(n!=node){
				let parent=n.parent
				parents.push(parent.children.indexOf(n))
				return getPath(parent,parents)
			}else{
				return parents
			}
		}
		const defineId=(n,id)=>Object.defineProperty(n.attribs,"id",{
			enumerable: false,
			configurable: false,
			writable: false,
			value: id
		})

		node.find("[id]").each((i,idNode)=>{
			let path=getPath(idNode)
			let clonedNode=path.reduceRight((found,index)=>found.children[index],cloned.get(0))
			defineId(clonedNode.get(0),idNode.attribs.id)
		})

		if(node.is("[id]")){
			defineId(cloned.get(0),node.attribs.id)
		}

		return cloned
	}

	this.noIdClone=node=>{
		return node.clone()
	}

	this.xml=this.file.officeDocument.content.xml.bind(this.file.officeDocument.content)
}
