import React, {Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"
import {shallowEqual} from "recompose"

export default ({Paragraph})=>class __$1 extends Component{
	static displayName="paragraph"
	static propTypes={
		style: PropTypes.object.isRequired,
		numId: PropTypes.string,
		level: PropTypes.number,
		outline: PropTypes.number,
	}

	static contextTypes={
		style: PropTypes.object,
	}

	static childContextTypes={
		style: PropTypes.object
	}

	style=memoize((direct,context)=>{
		const defaultStyle=direct.flat4Character(context)
		const style=direct.flat(context)
		if(style.indent){
			if(style.indent.hanging){
				style.indent.firstLine=-style.indent.hanging
			}
		}

		if(style.numbering){
			let {nextValue, style:props,format}=style.numbering
			style.numbering={
				style:{...props, ...defaultStyle},
				label:nextValue(),
				format
			}
		}

		return {style,defaultStyle}
	},shallowEqual)

	childStyle=memoize((direct,context)=>{
		return Object.assign(direct.clone(),{r:{}}).inherit(context)
	},shallowEqual)

	getChildContext(){
		return {
			style:this.childStyle(this.props.style, this.context.style)
		}
	}

	render(){
		const {style:$1, ...props}=this.props
		const {style:{widow,orphan=widow, ...style}, defaultStyle}=this.style(this.props.style,this.context.style)
		return (
			<Paragraph
				{...style}
				{...props}
				{...{widow,orphan,defaultStyle}}
				/>
		)
	}
}
