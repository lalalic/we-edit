import React, {Component} from "react"
import PropTypes from "prop-types"

import Run from "./run"


export default function transform(Models){
	return class extends Component{
		static displayName="docx-paragraph"
		static namedStyle="*paragraph"
		static contextTypes={
			p: PropTypes.object,
			r: PropTypes.object,
			styles: PropTypes.object
		}

		static childContextTypes={
			r: PropTypes.object
		}

		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props,this.context)
		}

		getChildContext(){
			return {
				r: this.rStyle
			}
		}

		componentWillReceiveProps(direct,context){
			const styles=context.styles
			let style=styles[direct.namedStyle||this.constructor.namedStyle]
			
			let rStyle=Run.mergeStyle(style)
				
			let pStyle=transform.mergeStyle(style, direct)
			
			
			this.style={...context.p, ...pStyle, ...direct}
			this.rStyle={...context.r,...rStyle}
		}

		render(){
			return <Models.Paragraph {...this.style} children={this.props.children}/>
		}
	}
}

transform.mergeStyle=function(named, direct={}){
	return "spacing,indent,align".split(",")
		.reduce((o,key,t)=>{
			if(direct[key]==undefined && (t=named.get(`p.${key}`))!=undefined)
				o[key]=t
			return o
		},{})
}