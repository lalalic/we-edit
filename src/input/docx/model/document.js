import React, {Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class Document extends Component{
		static displayName="docx-document"
		
		static propTypes={
			styles: PropTypes.object.isRequired,
			evenAndOddHeaders: PropTypes.bool
		}
		
		static childContextTypes={
			styles: PropTypes.object,
			evenAndOddHeaders: PropTypes.bool
		}
		
		getChildContext(){
			return {
				styles:this.props.styles,
				evenAndOddHeaders: !!this.props.evenAndOddHeaders
			}
		}

		render(){
			const {styles,evenAndOddHeaders,...others}=this.props
	
			Object.keys(styles).forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
			
			return <Models.Document {...others}/>
		}
	}
}