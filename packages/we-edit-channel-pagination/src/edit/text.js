import React from "react"
import Base from "../text"

import {editable} from "we-edit/model/edit"
import recomposable from "./recomposable"

import shallowEqual from "we-edit/tools/shallow-equal"

export default class Text extends editable(recomposable(Base)){
    componentWillReceiveProps(next,context){
        if(!shallowEqual(this.props,next)){
            this.computed.breakOpportunities=this.getBreakOpportunitiesWidth(next,context)
        }
    }
}
