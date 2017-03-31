import React, {Children,Component, PropTypes} from "react"

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
		static contextTypes={
			p: PropTypes.object,
			r: PropTypes.object,
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
				r: {...this.context.r,...this.props.r}
			}
		}

		componentWillReceiveProps(next,context){
			this.style={...context.p,...next}
		}

		render(){
			return <Paragraph {...this.style}/>
		}
	}
}