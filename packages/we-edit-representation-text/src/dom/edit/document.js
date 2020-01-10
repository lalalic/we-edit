import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {Editors} from "we-edit-representation-html"
import TextLineCanvas from "./responsible-canvas"

export default class  extends Component{
	static displayName="text-document"
	static propTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		color: PropTypes.string,
		wrap: PropTypes.bool,
		background: PropTypes.string,
		activeColor: PropTypes.string,
		lineNo: PropTypes.bool
	}

	static defaultProps={
		canvas:<TextLineCanvas/>,
	}

	static childContextTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		color: PropTypes.string,
		wrap: PropTypes.bool,
		background: PropTypes.string,
		activeColor: PropTypes.string,
		measure: PropTypes.object,
		lineNo: PropTypes.bool,
	}

	static contextTypes={
		Measure: PropTypes.func
	}

	getMeasure=memoize((Measure, fonts, size)=>new Measure({fonts,size}))

	getChildContext(){
		const {
			colorful,
			fonts="arial",
			size=11,
			lineHeight="140%",
			background,
			activeColor="lightblue",
			lineNo=true,
		}=this.props
		return {
			colorful, fonts, size, lineHeight, background,activeColor,
			measure:this.getMeasure(this.context.Measure, fonts, size),
			lineNo,
		}
	}

	render(){
		const {lineNo=true, colorful, fonts, size, lineHeight, background,activeColor, ...props}=this.props
		var {left=0, ...margin}=props.margin||Editors.Document.defaultProps.margin
		if(lineNo){
			left+=this.getChildContext().measure.stringWidth("999")+2
		}
		return (<Editors.Document {...props} margin={{...margin,top:0, left}}/>)
	}
}