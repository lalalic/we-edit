import React, {Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class Text extends Component{
		static displayName="docx-text"
		static contextTypes={
			r: PropTypes.object
		}
		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props,this.context)
		}

		componentWillReceiveProps(next,context){
			this.style={...context.r,...next}
		}

		render(){
			return <Models.Text {...this.style}/>
		}
	}
}