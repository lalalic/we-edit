import React, {Component} from "react"
import PropTypes from "prop-types"

export default function(Models){
	return class Document extends Component{
		static displayName="docx-document"

		static childContextTypes={
			styles: PropTypes.object,
			evenAndOddHeaders: PropTypes.bool,
			style: PropTypes.object
		}

		get styles(){
			return this.props.children[0].props.styles
		}

		getChildContext(){
			return {
				styles:this.styles,
				evenAndOddHeaders: !!this.props.evenAndOddHeaders,
				style: this.styles['*']
			}
		}
		
		resetNumbering(){
			let styles=this.styles

			//reset for numbering
			Object.keys(styles)
				.forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
		}

		render(){
			const {children:[,...content],evenAndOddHeaders,...others}=this.props
			
			this.resetNumbering()
			
			return <Models.Document {...others} children={content}/>
		}
	}
}
