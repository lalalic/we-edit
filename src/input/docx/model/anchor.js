import React, {Children, Component, PropTypes} from "react"

export default function(Models){
	return class Anchor extends Component{
		static displayName="anchor"

		render(){
			return <Models.Frame {...this.props}/>
		}
	}
}