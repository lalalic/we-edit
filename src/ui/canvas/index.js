import React, {PureComponent, Children} from "react"

export default class Canvas extends PureComponent{
	render(){
		const {doc,children}=this.props
		return Children.only(children)
	}
}
