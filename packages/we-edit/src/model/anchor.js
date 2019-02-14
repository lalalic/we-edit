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
        }).isRequired,
        y: PropTypes.shape({
            base: PropTypes.string,
            offset: PropTypes.number,
            align: PropTypes.string
        }).isRequired,
        wrap:PropTypes.shape({
            mode:PropTypes.oneOf("TopAndBottom,Square,Tight,Through".split(",")),
            wrapText: PropTypes.oneOf("bothSides,left,right,largest".split(","))
        }).isRequired
    }
}
