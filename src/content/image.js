import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"

export default class Image extends NoChild{
    static displayName="image"
    createComposed2Parent(){
        const {src, ...others}=this.props
        const {contentStyle:{extent:{width,height}}}=this.computed
        let availableSpace=this.context.parent.nextAvailableSpace({width,height})
        return <image {...{
                width,
                height,
                xlinkHref: src,
                y:-height
            }} />
    }
}
