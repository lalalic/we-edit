import React, {Component, PropTypes} from "react"

export default function(Models){
	return class extends Component{
		static displayName="docx-row"
		
		render(){
			return <Models.Row {...this.props}/>
		}
	}
}