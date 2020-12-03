import propTypes from "prop-types"
import React, {Component} from "react"
import PropTypes from "prop-types"

export default class PAGE extends Component{
    static displayName="PAGE"
    static contextTypes={
        page: PropTypes.object
    }
    render(){
        return this.context.page.I
    }
}