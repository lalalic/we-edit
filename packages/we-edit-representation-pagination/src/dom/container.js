import React from "react"
import {HasParentAndChild} from "../composable"
import {dom} from "we-edit"
import {Group} from "../composed"

export default class __$1 extends HasParentAndChild(dom.Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {width,height,minWidth,x,y,wrap, anchor,composedAt, descent,pagination,replaceable, ...props}=element.props
        return super.appendComposed(React.createElement(Group,{
            width,height,minWidth,wrap, anchor,descent,pagination,x,y,replaceable,composedAt,
            children:React.cloneElement(element,{x:undefined, y:undefined,wrap:undefined,anchor:undefined,replaceable:undefined,composedAt:undefined})
        }))
    }
}
