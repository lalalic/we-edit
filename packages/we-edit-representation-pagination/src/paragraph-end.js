import React from "react"
import PropTypes from "prop-types"
import {models,ACTION} from "we-edit"
import {NoChild} from "./composable"
import {Text as ComposedText} from "./composed"

const Super=NoChild(models.Unknown)
export default class extends Super{
    static contextTypes={
        ...Super.contextTypes,
        Measure: PropTypes.func,
    }

    render(){
        this.context.parent.appendComposed(this.createComposed2Parent())
        return null
    }

    createComposed2Parent(){
        const {context:{Measure},props:{fonts,size,bold,italic}}=this
        const measure=new Measure({fonts:fonts,size,bold,italic})
        return (
            <ComposedText
                {...measure.defaultStyle}
                width={measure.stringWidth(models.Paragraph.End)}
                minWidth={0}
                children={[models.Paragraph.End]}
                className="ender"
                />
        )
    }
}
