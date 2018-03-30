import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export class Input extends PureComponent{
	static contextTypes={
		doc: PropTypes.object
	}
	render(){
		const {stream}=this.props
		doc.save(stream)
		return null
	}
}

Emitter.support(<Emitter><Input/></Emitter>)