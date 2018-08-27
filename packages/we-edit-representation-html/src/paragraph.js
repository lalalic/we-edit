import React from "react"
import {models} from "we-edit"
const {Paragraph:Base}=models

export default class Paragraph extends Base{
	render(){
		const {spacing:{top, bottom, lineHeight}, indent:{left,right,firstLine}, align:textAlign, numbering}=this.props
		let style={textAlign}
		
		left && (style.paddingLeft=left);
		right && (style.paddingRight=right);
		top && (style.paddingTop=top);
		bottom && (style.paddingBottom=bottom);
		
		firstLine && (style.textIndent=firstLine);
		
		lineHeight && (style.lineHeight=lineHeight);
		
		return (
			<p style={style}>{this.props.children}</p>
		)
	}
}
