import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Text})=>class DocxText extends Component{
	static displayName="text"
	static contextTypes={
		style: PropTypes.object,
	}

	render(){
		return <Text {...{...this.context.style,...this.props}}/>
	}
}
