import React, {Children, Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class Anchor extends Component{
		static displayName="anchor"

		render(){
			return <Models.Frame {...this.props}/>
		}
	}
}