import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class extends Component{
    static displayName="anchor"
    static propTypes={
        x: PropTypes.shape({
            base: PropTypes.string,
            offset: PropTypes.number,
            align: PropTypes.string
        }),
        y: PropTypes.shape({
            base: PropTypes.string,
            offset: PropTypes.number,
            align: PropTypes.string
        }),
        wrap:PropTypes.shape({
            mode:PropTypes.oneOf("TopAndBottom,Square,Tight,Through".split(",")),
            wrapText: PropTypes.oneOf("BothSides,Left,Right,Largest".split(","))   
        })
    }
}
