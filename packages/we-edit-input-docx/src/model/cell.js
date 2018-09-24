import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Cell})=>class extends Component{
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
		return <Cell {...others}/>
	}
}
