import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {Paragraph,Character} from "../styles"


export default ({Row})=>class __$1 extends Component{
	static displayName="row"
	static contextTypes={
		style: PropTypes.object,
		cols: PropTypes.arrayOf(PropTypes.number)
	}

	static childContextTypes={
		style: PropTypes.object
	}
	childStyle=memoize((direct,context)=>{
		return direct ? direct.inherit(context) : context
	})

	getChildContext(){
		return {style:this.childStyle(this.props.style, this.context.style)}
	}

	render(){
		const {style:$1,...props}=this.props
		const childStyle=this.childStyle(this.props.style, this.context.style)
		const style=childStyle.flat4Row()
		const cols=this.context.cols.reduce((state,w)=>{
			state.cols.push({x:state.x,width:w})
			state.x+=w
			return state
		},{x:0,cols:[]}).cols
		const width=cols.slice(-1).reduce((w,a)=>a.x+a.width,0)
		return <Row {...{...props,...style, cols,width}}/>
	}
}
