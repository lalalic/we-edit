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

    componentWillReceiveProps({children}){
        this.computed.breakOpportunities=this.getBreakOpportunities(Children.toArray(children))
    }
})

export const Paragraph=mix
