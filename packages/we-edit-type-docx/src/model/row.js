import React, {Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class extends Component{
		static displayName="docx-row"
		
		render(){
			return <Models.Row {...this.props}/>
		}
	}
}