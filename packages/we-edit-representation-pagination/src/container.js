import React from "react"
import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
import {Group} from "./composed"

export default class extends HasParentAndChild(models.Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {width,height,minWidth,wrap,anchor,descent,pagination}=element.props
        return super.appendComposed(React.createElement(Group,{
            width,height,minWidth,wrap,anchor,descent,pagination,
            children:element
        }))
    }
}
