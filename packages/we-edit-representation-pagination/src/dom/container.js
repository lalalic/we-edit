import React from "react"
import {HasParentAndChild} from "../composable"
import {dom} from "we-edit"
import {Group} from "../composed"

export default class __$1 extends HasParentAndChild(dom.Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {
            width,height,minWidth,x,y,blockOffset,
            wrap, anchor,
            descent,pagination,
            mergeOpportunity,
            ...props}=element.props
        return super.appendComposed(React.createElement(Group,{
            width,height,minWidth,wrap, anchor,descent,pagination,x,y,blockOffset,mergeOpportunity,
            children:React.cloneElement(element,{
                x:undefined, y:undefined,wrap:undefined,anchor:undefined,blockOffset:undefined,
                mergeOpportunity:undefined,
            })
        }))
    }
}
