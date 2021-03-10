import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

/**
anchor can be positioned seperatedly x and y, and also can be wrapped
*/
export default class Anchor extends Component{
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
            mode: PropTypes.oneOf(["square", "tight", "clear","no"]),
            side: PropTypes.oneOf(["both","left","right","largest"]),
            
            geometry: PropTypes.string,
            wrap: PropTypes.func,
        }),
    }
}
