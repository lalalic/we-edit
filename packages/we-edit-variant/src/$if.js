import React from "react"
import PropTypes from "prop-types"

import Component from "./$"


export default ({Text})=>class extends Component{
    static displayName="$if"
    static propTypes={
		condition: PropTypes.string.isRequired
    }

    static defaultProps={
		condition: "true"
    } 
}
