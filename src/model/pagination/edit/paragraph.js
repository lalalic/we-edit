import React,{Children} from "react"
import Base from "../paragraph"

import {editable} from "model/edit"
import recomposable from "./recomposable"

const Super=editable(recomposable(Base))

export default class Paragraph extends Super{
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
    }
	
	render(){
		if(this.computed.composed.length>0)
			return null
		
		if(!this.context.parent.shouldContinueCompose())
			return null
		
		return super.render()
	}
}
