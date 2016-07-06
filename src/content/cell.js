import React, {PropTypes} from "react"

import Container from "./container"
import {togglable} from "./any"

let Super=togglable(Container)
export default class Cell extends Super{
	
	static contextTypes=Object.assign({
		colWidth: PropTypes.number
	},Super.contextTypes)
}