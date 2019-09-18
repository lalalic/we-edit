import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {NoChild} from "../../composable"
import {Text as ComposedText} from "../../composed"

const Super=NoChild(dom.Unknown)
export default class __$1 extends Super{
    static propTypes={
        ...Super.propsTypes,
        End:PropTypes.string
    }

    static contextTypes={
        ...Super.contextTypes,
        Measure: PropTypes.func,
    }

    render(){
        this.context.parent.appendComposed(this.createComposed2Parent())
        return null
    }

    createComposed2Parent(){
        const {context:{Measure},props:{fonts,size,bold,italic, End=""}}=this
        const measure=new Measure({fonts:fonts,size,bold,italic})
        return (
            <ComposedText
                {...measure.defaultStyle}
                width={measure.stringWidth(End)}
                minWidth={0}
                children={[End]}
                className="ender"
                />
        )
    }
}
