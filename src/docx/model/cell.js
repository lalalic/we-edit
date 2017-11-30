import React, {Component} from "react"
import PropTypes from "prop-types"


export default function(Models){
	return class Cell extends Component{
		static displayName="docx-cell"
		static childContextTypes={
			p: PropTypes.object,
			r: PropTypes.object
		}

		getChildContext(){
			const {p,r}=this.props
			return {p,r}
		}

		render(){
			const {p,r,...others}=this.props
			return <Models.Cell {...others}/>
		}
	}
}