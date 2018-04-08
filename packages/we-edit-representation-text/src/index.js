import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

export {default as Output} from "./output"

export class Text extends Component{
	static displayName="text"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"text"
	}
	
	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Representation.support(Text)
