import React from "react"
import {HasParentAndChild,Stoppable} from "../composable"
import {dom} from "we-edit"
import {Group} from "../composed"

export default class Container extends Stoppable(HasParentAndChild(dom.Container),false){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    createComposed2Parent(element){
        const {createComposed2Parent}=this.props
        const {
            width,height,minWidth,x,y,blockOffset,
            wrap, anchor,
            descent,pagination,
            tokenizeOpportunity,
            mergeOpportunity,
            ...props}=element.props
        const myElement=React.createElement(Group,{
            width,height,minWidth,wrap, anchor,descent,pagination,x,y,blockOffset,tokenizeOpportunity,
            children:React.cloneElement(element,{
                x:undefined, y:undefined,wrap:undefined,anchor:undefined,blockOffset:undefined,
                tokenizeOpportunity:undefined,
                mergeOpportunity:undefined,
            })
        })
        return createComposed2Parent ? createComposed2Parent(myElement) : myElement
    }
}
