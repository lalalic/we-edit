import React from "react"
import Base from "../text"

import {editify} from "we-edit"
import recomposable from "./recomposable"

import {shallowEqual} from "we-edit"

export default class Text extends editify(recomposable(Base)){
    componentWillReceiveProps(next,context){
        if(!shallowEqual(this.props,next)){
            this.computed.breakOpportunities=this.getBreakOpportunitiesWidth(next,context)
        }
    }
}
