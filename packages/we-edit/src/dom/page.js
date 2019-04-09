import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Page extends Component{
    static displayName="page"
    
    static propTypes={
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number
        })
    }

    static defaultProps={
        margin:{
            top:0,
            left:0,
            right:0,
            bottom:0
        }
    }
}
