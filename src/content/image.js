import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"

export default class Image extends NoChild{
    static displayName="image"
    createComposedPiece(){
        const {src, width, height, ...others}=this.props
        let availableSpace=this.context.parent.nextAvailableSpace({width,height})
        let props=(Object.assign(others,{
                width,
                height,
                xlinkHref: src,
                y:-height
            }))

        return <image {...props} />
    }
}
