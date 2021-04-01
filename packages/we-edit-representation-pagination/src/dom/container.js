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
            width,height,minWidth,tabWidth,
            x,y,blockOffset,
            wrap, anchor,
            descent,pagination,
            tokenizeOpportunity,
            }=element.props
        const myElement=React.isValidElement(element) ? React.createElement(Group,{
            width,height,minWidth,wrap, anchor,descent,pagination,x,y,blockOffset,tokenizeOpportunity,tabWidth,
            children:React.cloneElement(element,clear(element.props))
        }) : element
        return createComposed2Parent ? createComposed2Parent(myElement,element) : myElement
    }
}
const Clear_Props="x,y,dy,wrap,anchor,blockOffset,tokenizeOpportunity,mergeOpportunity,tabWidth".split(",")
const clear=props=>Clear_Props.reduce((props,k)=>(delete props[k], props),{...props})