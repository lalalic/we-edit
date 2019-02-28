
import immutable,{Map} from "immutable"
import Input from "../src/input"
import {testEditableDocument} from "../src/tck"
class StateDocument extends Input.Editable{
    static uuid=1
    constructor(content,_content){
        super()
        this.content=content.toJS()
        this._content=_content
    }

    makeId(node){
        if(node){
            node.id=node.id||`0${StateDocument.uuid++}`
        }else{
            return `0${StateDocument.uuid++}`
        }
    }

    renderNode({id}){
        const node=this.getNode(id)
        this._content.set(id,immutable.fromJS(node))
        if(Array.isArray(node.children)){
            node.children.forEach(a=>this.renderNode({id:a}))
        }
        return node
    }

    renderChanged(){
        return this.renderNode(...arguments)
    }

    getNode(id){
        return this.content[id]
    }

    cloneNode({id}){
        const {id:_,...cloned}=this.getNode(id)
        this.makeId(cloned)
        this.content[cloned.id]=cloned
        if(Array.isArray(cloned.children)){
            cloned.children.map(a=>this.cloneNode({id:a}))
        }
        return cloned
    }

    createNode(node,position){
        this.makeId(node)
        if(position){
            const {id,at=0}=position
            const reference=this.getNode(id)
            const parent=this.getNode(reference.parent)
            if(at==0){
                this.insertNodeBefore(node,reference,parent)
            }else if(at==1){
                this.insertNodeAfter(node,reference,parent)
            }
        }else{
            this.attach(node)
        }

        return {id:node.id,at:0}
    }

    construct({id:from},to){
        var  constructed
        const up=id=>{
            var {id:_,children,parent,...cloned}=this.getNode(id)
            cloned.children=cloned.type=="text" ? "" : []
            this.makeId(cloned)
            this.content[cloned.id]=cloned
            if(id!=to && parent){
                const parentNode=up(parent)
                cloned.parent=parentNode.id
                parentNode.children.push(cloned.id)
            }else if(id==to){
                constructed=cloned
            }else{
                throw new Error()
            }
            return cloned
        }
        up(from)
        return constructed
    }

    updateNode({id},{children,parent,type,...props}){
        const node=this.getNode(id)
        const updated={...node,props:{...node.props,...props}}
        if(children!==undefined)
            updated.children=children
        if(parent!=undefined)
            updated.parent=parent
        if(type!=undefined)
            updated.type=type
        this.content[id]=updated
        this.renderChanged({id})
        return this.content[id]
    }

    splitNode({id},at, firstKeepId=true){
        const node=this.getNode(id)
        if(node.type=="text"){
            const text=node.children
            const cloned=this.cloneNode(node)
            if(firstKeepId){
                this.updateNode(node,{children:text.substring(0,at)})
                cloned.children=text.substring(at)
                this.insertNodeAfter(cloned,node,{id:node.parent})
                return [{id:node.id,at},{id:cloned.id,at:0}]
            }else{
                this.updateNode(node,{children:text.substring(at)})
                cloned.children=text.substring(0,at)
                this.insertNodeBefore(cloned,node,{id:node.parent})
                return [{id:cloned.id,at},{id:node.id,at:0},]
            }
        }else{
            return [{id,at},{id,at}]
        }
    }

    removeNode({id}, deep=true){
        const node=this.getNode(id)
        const remove=id=>{
            const {children=[]}=this.getNode(id)
            if(Array.isArray(children)){
                children.forEach(remove)
            }
            delete this.content[id]
        }
        if(!deep){
            delete this.content[id]
        }else{
            remove(id)
        }

        const parent=this.getNode(node.parent)
        if(parent){
            parent.children=parent.children.filter(a=>a!=id)
            this.renderChanged(parent)
        }
    }

    /*append when referenceNode is falsy */
    insertNodeBefore(newNode,referenceNode,parentNode){
        parentNode=this.getNode(parentNode.id)
        const i=referenceNode ? parentNode.children.indexOf(referenceNode.id) : parentNode.children.length
        this.makeId(newNode)
        if(this.content[newNode.id]){
            this.removeNode(newNode,false)
        }
        newNode.parent=parentNode.id
        this.content[newNode.id]=newNode
        parentNode.children.splice(i,0,newNode.id)
        this.renderChanged(parentNode)
        return newNode
    }

    //prepend when referenceNode is falsy
    insertNodeAfter(newNode,referenceNode,parentNode){
        const {children:siblings=[]}=this.getNode(parentNode.id)
        const beforeNode=!referenceNode ? siblings[0] : siblings[siblings.indexOf(referenceNode.id)+1]
        return this.insertNodeBefore(newNode,beforeNode ? {id:beforeNode} : null,parentNode)
    }

    attach(node){
        this.makeId(node)
        this.content[node.id]=node
        return this.renderChanged({id:node.id})
    }
}

describe("EditableDocument Reference Implemenetation",()=>{
    testEditableDocument(StateDocument)
})
