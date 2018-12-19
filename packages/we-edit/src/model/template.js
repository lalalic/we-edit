import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Template extends Component{
	static displayName="template"
	static propTypes={
        create: PropTypes.func.isRequired
    }
}
