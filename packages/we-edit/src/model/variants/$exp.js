import React from "react"
import PropTypes from "prop-types"

import Component from "./$"


export default class extends Component{
    static displayName="$exp"
    static propTypes={
        expression:PropTypes.string.isRequired,
        name: PropTypes.string
    }

    static defaultProps={
        expression:"",
        getText({name,expression}){
            return `{${name||expression}}`
        }
    }
}
