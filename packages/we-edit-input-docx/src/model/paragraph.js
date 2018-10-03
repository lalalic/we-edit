import React, {Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"

import Run from "./run"


export default ({Text, Paragraph})=>class extends Component{
	static displayName="docx-paragraph"
	static propTypes={
		style: PropTypes.object.isRequired
	}

	static contextTypes={
		style: PropTypes.object
	}

	style=memoize((direct,context)=>{
		let style=direct.flat(context)
		if(style.indent){
			if(style.indent.hanging){
				style.indent.firstLine=-style.indent.hanging
			}
		}

		if(style.numbering){
			let {label, numId, level, style:props,format}=style.numbering
			style.numbering={
				label:<Text {...props} id={`${numId}_${level}`} children={label}/>,
				format
			}
		}

		return style
	})

	pilcrowStyle=memoize((direct,context)=>direct.flat4Character(context))

	render(){
		const {style, children, ...props}=this.props

		return (
			<Paragraph
				{...this.style(this.props.style,this.context.style)}
				{...props}
				>
				{children}
				<Text {...this.pilcrowStyle(this.props.style,this.context.style)}
					id={`${this.props.id}-pilcrow`}
					children={String.fromCharCode(0xb6)}/>
			</Paragraph>
		)
	}
}
