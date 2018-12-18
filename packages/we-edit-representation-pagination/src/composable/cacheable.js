import React, {Children} from "react"
import PropTypes from "prop-types"
import Recomposable from "./recomposable"

export default (A,partable)=>class extends A{
    static displayName=`cacheable(${partable ? "part" : "all"})-${A.displayName}`
    static contextTypes={
        ...A.contextTypes,
        getComposer: PropTypes.func
    }
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

        super.clearComposed(...arguments)

        if(!partable){//keep last Composed for recovering
            this.computed.lastComposed=[]
        }
    }

    render(){
        if(this.context.shouldContinueCompose && !this.context.shouldContinueCompose(this)){
            return null
        }

        const {changed}=this.props
        if(!changed && this.isAllChildrenComposed()){
            if(this.appendLastComposed()!==false){
                return null
            }
		}

        if(partable){
            const renderFrom=index=>{
                if(this.appendLastComposed()===false){
                    return super.render()
                }
                //only compose from changedIndex
                let _children=this.children
                this.children=()=>children.slice(index)
                const rendered=super.render()
                this.children=_children
                return rendered
            }
            const children=Children.toArray(this.props.children)
            if(changed){//remove changed part, and continue compose left
                const changedIndex=children.findIndex(a=>a.props.changed)
                if(![-1,0].includes(changedIndex)){
                    if(this.removeChangedPart(changedIndex)){
                        return renderFrom(changedIndex)
                    }
                }
            }else if(this.computed.lastComposed.length>0){//(!this.isAllChildrenComposed())
                const lastIndex=this.keepUntilLastAllChildrenComposed()
                if(lastIndex!=-1){
                    return renderFrom(lastIndex+1)
                }
            }
        }

        //last safe
        this.computed.lastComposed=[]
        return super.render()
	}

    appendLastComposed(){
        if(super.appendLastComposed){
            return super.appendLastComposed(...arguments)
        }

        this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
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
