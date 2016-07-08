import React, {PropTypes} from "react"

import Container from "./container"
import {togglable} from "./any"

let Super=togglable(Container)
export default class Cell extends Super{
	nextAvailableSpace(required){
		let {width,height}=super.nextAvailableSpace(...arguments)
		let {border, padding}=this.getBorderPadding()
		width=width-border.right-border.left-padding.right-padding-left
		height=height-border.top-border.bottom-padding.top-padding.bottom
		return {width,height}
	}
	
	getBorderPadding(){
		return {
			padding:{
				
			},
			border:{
				
			}
		}
	}
	
}