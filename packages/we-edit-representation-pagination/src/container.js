import React from "react"
import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
import {Group} from "./composed"

export default class extends HasParentAndChild(models.Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {id}=this.props
        const {width,height,minWidth,anchor}=element.props
        super.appendComposed(React.createElement(Group,{
            "data-type":this.getComposeType(),
            "data-content":id,
            width,height,minWidth,wrap,
            children:element
        }))
    }
}
