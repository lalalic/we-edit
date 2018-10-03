import React, {Children} from "react"
import Recomposable from "./recomposable"

export default (A,partable)=>class extends A{
    static displayName=`cacheable(${partable ? "part" : "all"})-${A.displayName}`
    constructor(){
        super(...arguments)
        this.computed.lastComposed=[]
    }

    createComposed2Parent(){
        let composed=super.createComposed2Parent(...arguments)
        this.computed.lastComposed.push(composed)
        return composed
    }

    clearComposed({changed}){
        if(!changed && this.isAllChildrenComposed()){
            return
        }

        if(partable){
            const alreadyComposed=this.computed.composed
            super.clearComposed(...arguments)
            this.computed.composed=alreadyComposed
        }else{
            super.clearComposed(...arguments)
        }
    }

    render(){
        const {changed}=this.props
        if(!changed && this.isAllChildrenComposed()){
			this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
            return null
		}

        if(partable){
            const children=Children.toArray(this.props.children)
            if(changed){
                const changedIndex=children.findIndex(a=>a.props.changed)
                if(![-1,0].includes(changedIndex)){
                    if(this.removeChangedPart(changedIndex)){
                        //then append left to parent
                        this.computed.lastComposed=[]
                        this.computed.composed.forEach(a=>this.context.parent.appendComposed(this.createComposed2Parent(a)))
                        //only compose from changedIndex
                        let _children=this.children
                        this.children=()=>children.slice(changedIndex)
                        const rendered=super.render()
                        this.children=_children
                        return rendered
                    }
                }
            }else if(this.computed.composed.length>0){//(!this.isAllChildrenComposed())
                const lastIndex=this.findLastChildIndexOfLastComposed()
                if(lastIndex!=-1){
                    this.computed.lastComposed=[]
                    this.computed.composed.forEach(a=>this.context.parent.appendComposed(this.createComposed2Parent(a)))
                    //only compose from changedIndex
                    let _children=this.children
                    this.children=()=>children.slice(lastIndex)
                    const rendered=super.render()
                    this.children=_children
                    return rendered
                }
            }
            
            this.computed.composed=[]
        }

        //last safe
        this.computed.lastComposed=[]
        return super.render()
	}

    removeChangedPart(changedChildIndex){
        if(super.removeChangedPart){
            return super.removeChangedPart(...arguments)
        }
        return false
    }

    findLastChildIndexOfLastComposed(){
        if(super.findLastChildIndexOfLastComposed){
            return super.findLastChildIndexOfLastComposed(...arguments)
        }
        return -1
    }
}
