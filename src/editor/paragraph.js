import React,{PropTypes} from "react"

import {Paragraph} from "../content"
import editable from "./editable"
import Inline from "./inline"
import Text from "./text"


export default class extends editable(Paragraph){
	_newLine(){
		return Object.assign(super._newLine(),{_id:this._id})
	}
	whatIfEmpty(){
		this.state.content.push(<Inline contentStyle={this.context.getDefaultStyle("inline")}><Text> </Text></Inline>)
	}
}
