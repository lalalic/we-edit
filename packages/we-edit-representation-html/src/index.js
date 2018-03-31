import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

export default class Html extends Component{
	static displayName="html"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"html"
	}

	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Representation.support(Html)
