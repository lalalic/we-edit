import {uuid} from "we-edit"
import {fromJS, Map} from "immutable"
import EditableDocument from "./editable"

export default class SerializableDocument extends EditableDocument{
	/*find node by id*/
	getNode(id){
		return this.doc.get(id)
	}

	//always attached
	cloneNode({id}, keepId=false){
		if(keepId){
			return this.getNode(id)
		}else{
			const cloned=this.getNode(id).withMutations(a=>{
				a.set("id",super.makeId())
				a.delete("parent")
				a.updateIn(["children"],children=>{
					if(typeof(children)!=="string" && children){
						return children.map(child=>{
							const id=this.cloneNode({id:child},false).get("id")
							this.doc.setIn([id,"parent"],a.get('id'))
							return id
						})
					}
					return children
				})
			})
			this.attach(cloned)
			return cloned
		}
	}

	//return [/*cursor at first part*/{id,at},/*cursor at second part*/{id,at}]
	splitNode({id,type},at, firstKeepId=true){
		debugger
		const node=this.getNode(id)
        if(node.get('type')=="text"){
            const text=node.get('children')
            const cloned=this.cloneNode(node.toJS())
			this.doc.setIn([cloned.get('id'),"parent"],node.get("parent"))
					
            if(firstKeepId){
                this.doc
					.setIn([id,"children"],text.substring(0,at))
					.setIn([cloned.get('id'),"children"],text.substring(at))
					.updateIn([node.get('parent'),"children"],children=>
						children.splice(children.indexOf(node.get('id'))+1,0,cloned.get("id"))
					)
                return [{id:node.get('id'),at},{id:cloned.get('id'),at:0}]
            }else{
				this.doc
					.setIn([cloned.get('id'),"children"],text.substring(0,at))
					.setIn([id,"children"],text.substring(at))
					.updateIn([node.get('parent'),"children"],children=>
						children.splice(children.indexOf(node.get('id')),0,cloned.get("id"))
					)
				return [{id:cloned.get('id'),at},{id:node.get('id'),at:0},]
            }
        }else{
            return [{id,at},{id,at}]
        }
	}

	/*
	at=0:before node{id},
	at=1:after node{id},
	create and attached when poisiton is falsy
	*/
	createNode(element, position/*{id,at=0}*/){
		const node=fromJS({props:{}, id:super.makeId(),...element})
        if(position){
			this.doc.set(node.get('id'),node)
            const {id,at=0}=position
            const reference=this.getNode(id)
            if(reference.get('type')=="paragraph" && node.get('type')=="text"){
				this.doc
					.setIn([node.get('id'),"parent"],id)
					.updateIn([id,"children"],children=>{
						return children.push(node.get('id'))
					})
            }else{
                const parent=this.doc.getIn([id,"parent"])
                if(at==0){
					this.doc
						.setIn([node.get('id'),"parent"],parent)
						.updateIn([parent,"children"],children=>{
							return children.splice(children.indexOf(id),0,node.get('id'))
						})
                }else if(at==1){
					this.doc
						.setIn([node.get('id'),"parent"],parent)
						.updateIn([parent,"children"],children=>{
							return children.splice(children.indexOf(id)+1,0,node.get('id'))
						})
                }
            }
        }else{
            this.attach(node)
        }

        return {id:node.get('id'),at:0}
	}

	updateNode({id}, {children,...changing}){
		if(!children){
			this.doc.updateIn([id,"props"],raw=>raw.merge(changing))
		}
	}

	removeNode({id}){
		
	}

	/*append when referenceNode is falsy */
	insertNodeBefore(newNode,referenceNode,parentNode){
		
	}
	//prepend when referenceNode is falsy
	insertNodeAfter(newNode,referenceNode,parentNode){

	}

	//return constructed node
	//fromId==toId should be supported
	construct({id:from},to){
		var constructed=null
        const up=id=>{
            const cloned=this.getNode(id).withMutations(node=>{
				node.set('id', super.makeId())
				node.updateIn(["children"],children=>{
					return node.get('type')=="text" ? "" : fromJS([])
				})
				node.updateIn(["parent"],parent=>{
					if(parent){
						if(id!=to){
							const pid=up(parent)
							this.doc.updateIn([pid,"children"],list=>list.push(node.get('id')))
							return pid
						}
					}
					if(id==to){
						constructed=node.get('id')
					}
					return Attacher
				})
			})
			this.doc.set(cloned.get('id'),cloned)
			return cloned.get('id')
        }
		
        up(from)
		
		return constructed
	}

	attach(node){
		if(!this.doc.has(Attacher)){
			this.doc.set(Attacher, fromJS({id:Attacher, type:"container",children:[],props:{}}))
		}
		
		if(!Map.isMap(node)){
			return this.createNode(node).id
		}
		
		const id=node.get("id")
		this.doc.set(id,node)
		this.doc.setIn([id,"parent"],Attacher)
		this.doc.updateIn([Attacher,"children"], children=>children.push(id))
		return id
	}
}
const Attacher="Container4Clone"
