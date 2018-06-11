import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

import Output from "./output"

export class Text extends Component{
	static displayName="text"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"text"
	}
	
	static Output=Output
	
	static install(){
		Representation.install(this)
	}
	
	static uninstall(){
		Representation.uninstall(this)
	}
	
	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Text.install()
