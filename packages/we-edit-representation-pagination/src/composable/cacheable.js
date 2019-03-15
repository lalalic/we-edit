import React, {Children} from "react"
import PropTypes from "prop-types"
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

    clearComposed({changed,children}){
        if(!changed && this.isAllChildrenComposed()){
            return
        }

        super.clearComposed(...arguments)

        if(!partable){//keep last Composed for recovering
            this.computed.lastComposed=[]
        }else if(changed){
            const next=Children.toArray(children)
            const last=Children.toArray(this.props.children)
            const changedIndex=next.findIndex((a, i)=>{
                if(a.props.changed)
                    return true
                const b=last[i]
                if(!b || a.props.id!=b.props.id)
                    return true
            })
            this.shouldRenderFrom={
                changedIndex,
                removedChildren:last.slice( changedIndex==-1 ? next.length : changedIndex)
                    .map(a=>a.props.id)
                    .filter(a=>a!==undefined)
            }
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
                const {changedIndex, removedChildren}=this.shouldRenderFrom
                let canPartRender=true
                if(removedChildren.length){
                    canPartRender=this.removeChangedPart(removedChildren)
                }
                if(canPartRender){
                    return renderFrom(changedIndex==-1 ? children.length : changedIndex)
                }
            }else if(this.computed.lastComposed.length>0){//(!this.isAllChildrenComposed())
                const lastIndex=this.keepUntilLastAllChildrenComposed()
                if(lastIndex!=-1){
                    return renderFrom(lastIndex+1)
                }
            }
        }

        //last safe
        this.clearComposed({changed:true})
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

    findContentId(content){
		return ((line,id)=>{
			const extract=a=>{
				if((id=a.props["data-content"])!==undefined)
					return true
				return Children.toArray(a.props.children).findIndex(extract)!=-1
			}
			extract(line)
			return id
		})(content)
	}
}
