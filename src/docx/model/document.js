import React, {Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class Document extends Component{
		static displayName="docx-document"

		static propTypes={
			evenAndOddHeaders: PropTypes.bool
		}

		static childContextTypes={
			styles: PropTypes.object,
			evenAndOddHeaders: PropTypes.bool
		}
		constructor(){
			super(...arguments)
			this.styles=this.getStyles(this.props)
		}

		componentWillReceiveProps(next){
			this.styles=this.getStyles(next)
		}

		getStyles({children:[styles]}){
			return this.styles=styles.props.styles
			
		}

		getChildContext(){
			return {
				styles:this.styles,
				evenAndOddHeaders: !!this.props.evenAndOddHeaders
			}
		}

		render(){
			const {children,evenAndOddHeaders,...others}=this.props
			let [styles,...content]=children
			styles=this.styles
			
			//reset for numbering
			Object.keys(styles)
				.forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())

			return <Models.Document {...others} children={content}/>
		}
	}
}
