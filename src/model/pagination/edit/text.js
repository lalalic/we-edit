import React from "react"
import Base from "../text"

import {editable} from "model/edit"
import recomposable from "./recomposable"

import shallowEqual from "react-redux/lib/utils/shallowEqual"

export default class Text extends editable(recomposable(Base)){
    componentWillReceiveProps(next){
        if(!shallowEqual(this.props,next)){
			console.debug("text changed")
            this.computed.breakOpportunities=this.getBreakOpportunitiesWidth()
        }
    }
}
