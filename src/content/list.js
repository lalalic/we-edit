import React from "react"
import Paragraph from "./paragraph"
import {WordWrapper} from "./text"

export default class list extends Paragraph{
    static displayName="list"
	
	_newLine(){
        let line=super._newLine()
		
		if(this.computed.composed.length==0){
			let {indent}=this.getStyle()
			let label=this.getLabel()
			let style=this.getLabelStyle()
			let {height}=new WordWraper(label,style)
			
			this.appendComposed(<Group width={indent.hanging} height={height}><text>{this.getLabel()}</text></Group>)
		}
		return line
	}
	
	getLabel(){
		return "1"
	}
	
	getLabelStyle(){
		return {
			rFonts:{},
			sz:12,
			b:1
		}
	}
}
