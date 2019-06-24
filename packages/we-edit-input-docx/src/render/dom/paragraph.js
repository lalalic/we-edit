import React, {Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"

import Run from "./run"


export default ({Text, Paragraph})=>class extends Component{
	static displayName="paragraph"
	static propTypes={
		style: PropTypes.object.isRequired,
		numId: PropTypes.string,
		level: PropTypes.number,
		outline: PropTypes.number,
	}

	static contextTypes={
		style: PropTypes.object,
		shouldContinueCompose: PropTypes.func
	}

	static childContextTypes={
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
			let {nextValue, numId, level, style:props,format}=style.numbering
			style.numbering={
				style:props,
				label:nextValue(),
				format
			}
		}

		return style
	})

	getChildContext(){
		return {
			style:this.childStyle(this.props.style, this.context.style)
		}
	}

	childStyle=memoize((direct,context)=>Object.assign(direct.clone(),{r:{}}).inherit(context))

	defaultStyle=memoize((direct,context)=>direct.flat4Character(context))

	shouldComponentUpdate(){
		return this.context.shouldContinueCompose()
	}

	render(){
		const {style:$1, ...props}=this.props
		const {widow,orphan=widow, ...style}=this.style(this.props.style,this.context.style)
		return (
			<Paragraph
				{...style}
				{...props}
				{...{widow,orphan}}
				defaultStyle={this.defaultStyle(this.props.style,this.context.style)}
				/>
		)
	}
}