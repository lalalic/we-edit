import React, {PropTypes} from "react"

import {Document} from "../content"
import editable from "./editable"
import Cursor from "./cursor"

let Super=editable(Document)
export default class extends Super{
	more(){
		return <Cursor ref="cursor"/>
	}
	
	
	static childContextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.childContextTypes)
	
	getChildContext(){
		var self=this
		return Object.assign(super.getChildContext(),{
			cursor(){
				return self.refs.cursor
			}
		})
	}
}