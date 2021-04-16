import React from "react"
import {dom} from "we-edit"
import Frame from "./frame"
import {HasParentAndChild} from "../composable"

const Page=HasParentAndChild(dom.Page)

export default class extends Frame{
    static displayName=this.switchTypeTo(Page)
    static propTypes={
        ...super.propTypes,
        ...Page.propTypes,
    }
    static defaultProps={
        ...super.defaultProps,
        ...Page.defaultProps,
        autoCompose2Parent:false,
    }

    recomposable_createComposed2Parent(){
        const {I, margin}=this.props
        return React.cloneElement(super.recomposable_createComposed2Parent(...arguments),{I,margin})
    }
}