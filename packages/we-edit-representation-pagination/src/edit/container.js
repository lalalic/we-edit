import React from "react"
import {Container} from "../all"
import {Group} from "../composed"
import editable from "./editable"

export default class extends editable(Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {id}=this.props
        const {width,height,minWidth}=element.props
        super.appendComposed(React.createElement(Group,{
            "data-type":this.getComposeType(),
            "data-content":id,
            width,height,minWidth,
            children:element
        }))
    }
}
