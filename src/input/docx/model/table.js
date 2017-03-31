import React, {Component, PropTypes} from "react"

export default function(Models){
	return class extends Component{
		static displayName="docx-table"

		render(){
			return <Models.Table {...this.props}/>
		}
	}
}