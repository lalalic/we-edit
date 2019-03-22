import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {NoChild} from "../../composable"
import {Text as ComposedText} from "../../composed"

const Super=NoChild(dom.Unknown)
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
                width={measure.stringWidth(dom.Paragraph.End)}
                minWidth={0}
                children={[dom.Paragraph.End]}
                className="ender"
                />
        )
    }
}
