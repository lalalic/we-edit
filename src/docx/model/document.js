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
		
		getChildContext(){
			return {
				styles:this.props.children[0].props.styles,
				evenAndOddHeaders: !!this.props.evenAndOddHeaders
			}
		}

		render(){
			const {children,evenAndOddHeaders,...others}=this.props
			let [styles,...content]=children
			styles=styles.props.styles
			
			Object.keys(styles)
				.forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
			
			return <Models.Document {...others} children={content}/>
		}
	}
}