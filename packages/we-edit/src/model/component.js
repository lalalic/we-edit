import React, {Component,Fragment} from "react"

export default class Base extends Component{
	static displayName="unknown"
	render(){
		return (<Fragment>{this.props.children}</Fragment>)
	}
}
