import React, {Component, PropTypes} from "react"
import Any, {togglable} from "./any"

let Super=togglable(Any)
export default class Inline extends Super{
    static displayName="inline"

    static childContextTypes=Object.assign({
        style: PropTypes.object
    }, Super.childContextTypes)

    getChildContext(){
        const {contentStyle}=this.props
        const {toggles}=this.context
        let style=Object.assign(contentStyle.inline,toggles)

        return Object.assign(super.getChildContext(),{
            style
        })
    }
}
