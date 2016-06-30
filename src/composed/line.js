import React, {Component, PropTypes} from "react"
import Group from "./group"

export default class Line extends Group{
	render(){
		const {height}=this.props
		return <Group y={height} {...this.props}/>
	}
}
