import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {Paragraph,Character} from "../styles"


export default ({Cell})=>class extends Component{
	static displayName="cell"
	static contextTypes={
		style: PropTypes.object
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
		const style=childStyle.flat4Cell()
		return <Cell {...{...props,...style}}/>
	}
}
