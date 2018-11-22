import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "./composed"

import composable,{HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Anchor:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
    createComposed2Parent(content){
        return React.cloneElement(super.createComposed2Parent(...arguments),{anchor:this})
    }

    xy(line){
        return this.props.xy(line,this)
    }
}
