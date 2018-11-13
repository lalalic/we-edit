import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Anchor:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
    createComposed2Parent(content){
        
    }
}
