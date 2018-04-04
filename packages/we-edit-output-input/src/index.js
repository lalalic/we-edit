import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export default class Input extends Emitter.Format{
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
		let docStream=this.context.doc.stream()
		docStream.pipe(stream)
		docStream.push(null)
		return null
	}
}

Emitter.support(Input)
