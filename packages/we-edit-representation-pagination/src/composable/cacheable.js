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
            const changedIndex=last.findIndex((a,i)=>{
                let b
                if(b=next[i]){
                    if(b.props.id==a.props.id){
                        if(!b.props.changed){
                            return false
                        }
                    }
                }
                return true
            })

            this.renderChangedPart=function(){
                switch(changedIndex){
                    case 0:
                        return false
                    case -1:
                        return this.renderFrom(last.length)
                    default:{
                        if(this.removeChangedPart(last.slice(changedIndex).map(a=>a.props.id))){
                            return this.renderFrom(changedIndex)
                        }
                        return false
                    }
                }
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
            if(changed){//remove changed part, and continue compose left
                if(this.renderChangedPart){
                    const changedRendered=this.renderChangedPart()
                    if(changedRendered!==false){
                        return changedRendered
                    }
                }
            }else if(this.computed.lastComposed.length>0){//(!this.isAllChildrenComposed())
                const lastIndex=this.keepUntilLastAllChildrenComposed()
                if(lastIndex!=-1){
                    return this.renderFrom(lastIndex+1)
                }
            }
        }

        //last safe
        this.clearComposed({changed:true})
        this.computed.lastComposed=[]
        return super.render()
	}

    renderFrom(index){
        if(this.appendLastComposed()===false){
            return super.render()
        }
        //only compose from changedIndex
        const _children=this.children
        try{
            this.children=()=>Children.toArray(this.props.children).slice(index)
            const rendered=super.render()
            return rendered
        }finally{
            this.children=_children
        }
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
