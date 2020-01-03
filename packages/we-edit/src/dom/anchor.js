import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

/**
anchor can be positioned seperatedly x and y, and also can be wrapped
*/
export default class __$1 extends Component{
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
		margin:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top:PropTypes.number,
			bottom:PropTypes.number,
		}),
        wrap:PropTypes.oneOfType([
            PropTypes.shape({
                mode:PropTypes.oneOf("TopAndBottom,Square,Tight,Through".split(",")).isRequired,
                wrapText: PropTypes.oneOf("bothSides,left,right,largest".split(","))
            }),
            PropTypes.func
        ])
    }
}
