import Editable from "input/editable-doc"

let _uuid=0
const uuid=()=>`${_uuid++}`
export default class EditableDocument extends Editable{
	constructor(data){
		super(...arguments)
		this.doc=data
	}
	
	serialize(){
		return JSON.stringify(this.doc)
	}
	
	get root(){
		return this.doc
	}
	
	makeId(node,uid){
		return node.id=uid||node.id||uuid()		
	}
	
	getNode(id){
		let node=this.doc, found
		const find=node=>{
			if(node.id==id)
				return found=node
			return node.children.find ? node.children.find(a=>find(a)) : null
		}
		
		return find(this.doc) ? found : null
	}
	
	_getParentNode(id){
		let node=this.doc, found
		const find=node=>{
			if(node.children.find ? node.children.find(a=>find(a)) : null)
				return found=node
			return node.id==id
		}
		
		return find(this.doc) ? found : null
	}
	
	cloneNode(node){
		return JSON.parse(JSON.stringify(node,(k,v)=>k=="id" ? undefined : v))
	}
	
	createNode(nodeTmpl,locationNode){
		return {...nodeTmpl}
	}
	
	updateNode({id,parent,...others}){
		let docNode=this.getNode(id)
		return Object.assign(docNode,others)
	}
	
	removeNode({id}){
		let {children}=this._getParentNode(id)
		let i=children.findIndex(a=>a==id)
		children.splice(i,1)
		return true
	}
	
	
	
	construct(from,to){
		let path=[]
		const find=node=>{
			if(node.id==from){
				path.push(node)
				return node
			}else if(node.children.find){
				if(node.children.find(a=>find(a))){
					if(node.id!=to){
						path.push(node)
						return true
					}else{
						path.push(node)
						return false
					}
				}
			}
			return false
		}
		
		find(this.doc)

		let piece=path.reduce((constructed,node)=>{
				let cloned=this.cloneNode(node)
				if(constructed)
					cloned.children=[constructed] 
				return cloned
			},null)

		return this.attach(piece)
	}
	
	attach(piece){
		return piece
	}
	
	resize(id,width,height){
		
	}	
}