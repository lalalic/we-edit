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
			this.rStyle={...context.r,...rStyle}
				
			let pStyle=transform.mergeStyle(style, direct)
			this.style={...context.p, ...pStyle, ...direct}
			
			if(this.style.num){
				const {numId,ilvl:level}=this.style.num
				const numStyle=styles[`_num_${numId}`]
				this.style.indent={
					...this.style.indent, 
					...numStyle.get(`${level}.p.indent`), 
					...direct.indent
				}
				
				let labelStyle={...this.rStyle,...direct.r, ...Run.mergeStyle(numStyle, {}, `${level}.r`)}
				
				this.style.numbering={
					label:(<Models.Text 
							children={numStyle.level(level).invoke(`next`)}
							{...labelStyle}
							id={`${numId}_${level}`}
							/>),
					format:numStyle.parent[level].numFmt,
					numId,
					level
				}
				
				delete this.style.num
			}
			
			try{
				if(this.style.indent.hanging){
					this.style.indent.firstLine=-this.style.indent.hanging
					delete this.style.indent.hanging
				}
			}catch(e){
				
			}
		}
		
		render(){
			return <Models.Paragraph {...this.style} children={this.props.children}/>
		}
	}
}

transform.mergeStyle=function(named, direct={}){
	return "spacing,indent,align,num,heading".split(",")
		.reduce((o,key,t)=>{
			if(direct[key]==undefined && (t=named.get(`p.${key}`))!=undefined)
				o[key]=t
			return o
		},{})
}