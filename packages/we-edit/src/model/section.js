import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class extends Component{
	static displayName="section"
	static propTypes={
        create: PropTypes.func.isRequired
    }
}
