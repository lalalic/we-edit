import React, {PureComponent} from "react"

export default class Canvas extends PureComponent{
	render(){
		const {doc,children}=this.props
		return (
			<div>{children}</div>
		)
	}
}
