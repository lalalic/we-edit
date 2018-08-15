import React, {Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"

import Run from "./run"


export default function transform(Models){
	return class extends Component{
		static displayName="docx-paragraph"
		static propTypes={
			style: PropTypes.object.isRequired
		}
		
		static contextTypes={
			style: PropTypes.object
		}
		
		style=(direct,context)=>{
			let style=direct.flat(context)
			if(style.indent){
				if(style.indent.hanging){
					style.indent.firstLine=-style.indent.hanging
				}
			}
			
			if(style.numbering){
				let {label, numId, level, style:props,format}=style.numbering
				style.numbering={
					label:<Models.Text {...props} id={`${numId}_${level}`} children={label}/>,
					format
				}
			}
			
			return style
		}
		
		render(){
			const {style, ...props}=this.props
			
			return <Models.Paragraph
				{...this.style(this.props.style,this.context.style)}
				{...props}
				/>
		}
	}
}