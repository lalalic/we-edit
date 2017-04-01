import React, {Children,Component, PropTypes} from "react"
import {getStyles} from "state/selector"

export default function transform(Models){
	const Paragraph=Models.Paragraph.mixin(transform.extend={
		getBreakOpportunities(){
			let children=[]
			Children.forEach(this.props.children, r=>{
				children.splice(children.length,0,...Children.toArray(r.props.children))
			})
			let opportunities=Models.Paragraph.prototype.getBreakOpportunities.call(this,children)
			return opportunities
		}
	})
	
	return class extends Component{
		static displayName="docx-paragraph"
		static namedStyle="*paragraph"
		static contextTypes={
			p: PropTypes.object,
			r: PropTypes.object,
			store: PropTypes.any
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
			const styles=getStyles(context.store.getState())
			let style=styles.get(direct.namedStyle||this.constructor.namedStyle)
			
			let rStyle="bold,italic,vanish".split(",")
				.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
				)
				
			let pStyle="spacing,indent".split(",")
					.reduce((o,key,t)=>{
						if(direct[key]!=undefined && (t=style.get(`p.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
			
			this.style={...context.p, ...pStyle, ...direct}
			this.rStyle={...context.r,...rStyle}
		}

		render(){
			return <Paragraph {...this.style}/>
		}
	}
}