import React,{Children} from "react"
import Base from "../paragraph"

import {editable} from "model/edit"
import recomposable from "./recomposable"

let mix
export default editable(recomposable(Base)).mixin(mix={
    _isLastComposedFitIntoParent(){
        return true
    },

    /**
     *  isAllChildrenComposed will affect last line height, so here we need make it right
     */
    appendLastComposed(){
        let children=this.computed.children
        this.computed.children=[]//make isAllChildrenComposed right
        let len=this.computed.lastComposed.length
        this.computed.lastComposed.forEach((one,i)=>{
            this.computed.composed.push(one)
            if(i==len-1){//make isAllChildrenComposed right
                this.computed.children=children
            }
            this.context.parent.appendComposed(this.createComposed2Parent(one))
        })
        this.context.parent.on1ChildComposed(this)
        this.computed.lastComposed=null
    },

    componentWillReceiveProps({children,getChildText}){
        children=Children.toArray(children)
        let current=Children.toArray(this.props.children)
        if(current.length==children.length){
            let redo=false
            for(let i=0,len=children.length;i<len;i++){
                if(getChildText(children[i])!==this.props.getChildText(current[i])){
                    redo=true
                    break
                }
            }
            if(!redo)
                return
        }
        this.computed.breakOpportunities=this.getBreakOpportunities(children)
    },
	
	render(){
		if(this.computed.composed.length>0)
			return null
		
		if(!this.context.parent.shouldContinueCompose())
			return null
		
		return Base.prototype.render.apply(this)
	}
})

export const Paragraph=mix
