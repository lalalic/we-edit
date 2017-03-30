import React, {Children,Component, PropTypes} from "react"

export default function(Models){
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
			return <Models.Paragraph {...this.style}/>
		}
	}
}