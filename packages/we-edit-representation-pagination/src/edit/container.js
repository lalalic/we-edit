import React from "react"
import {Container} from "../all"
import {Group} from "../composed"
import recomposable from "./recomposable"

export default class extends recomposable(Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }

    appendComposed(element){
        const {id}=this.props
        const {width,height}=element.props
        super.appendComposed(React.createElement(Group,{
            "data-type":this.getComposeType(),
            "data-content":id,
            width,height,
            children:element
        }))
    }
}
