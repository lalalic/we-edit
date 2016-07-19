import React, {Component, PropTypes} from "react"
import Group from "./group"

export default class Line extends Group{
	render(){
		const {height, descent}=this.props
		return <Group y={height-descent} {...this.props}/>
	}
}
