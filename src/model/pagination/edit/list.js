import React from "react"
import Base from "../list"
import Paragraph from "./paragraph"

import {editable} from "model/edit"
import recomposable from "./recomposable"

export default class List extends editable(recomposable(Base)){
    _isLastComposedFitIntoParent(){
        return Paragraph.prototype._isLastComposedFitIntoParent.apply(this)
    }

    appendLastComposed(){
        return Paragraph.prototype.appendLastComposed.apply(this,arguments)
    }

    componentWillReceiveProps(next){
        return Paragraph.prototype.componentWillReceiveProps.apply(this,arguments)
    }
}
