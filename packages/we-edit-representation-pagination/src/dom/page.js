import React from "react"
import {dom} from "we-edit"
import Frame from "./frame"
import {HasParentAndChild} from "../composable"

const Page=HasParentAndChild(dom.Page)

export default class extends Frame{
    static displayName=this.switchTypeTo(Page)
    static defaultProps={
        ...Frame.defaultProps,
        ...Page.defaultProps,
        autoCompose2Parent:false
    }

    recomposable_createComposed2Parent(){
        const {i, I=i}=this.props
        return React.cloneElement(super.recomposable_createComposed2Parent(...arguments),{I, i})
    }
}