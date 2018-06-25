import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

import Output from "./output"

export default class Text extends Representation.Base{
	static displayName="text"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"text"
	}
	
	static Output=Output
	
	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Text.install()