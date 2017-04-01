import React, {Component, PropTypes} from "react"

export default function(Models){
	return class Document extends Component{
		static displayName="docx-document"
		
		static childContextTypes={
			styles: PropTypes.object
		}
		
		getChildContext(){
			return {
				styles:this.props.styles
			}
		}

		render(){
			const {styles,...others}=this.props
			
			
			return <Models.Document {...others}/>
		}
	}
}