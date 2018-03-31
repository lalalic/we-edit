import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export class Input extends Emitter.Format{
	static displayName="[Origin]"
	static propTypes={
		type: PropTypes.string.isRequired,
	}

	static defaultProps={
		type:"",
	}

	static contextTypes={
		doc: PropTypes.object
	}

	render(){
		const {stream}=this.props
		doc.save(stream)
		return null
	}
}

Emitter.support(Input)
