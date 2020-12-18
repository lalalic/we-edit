import React, {Component} from "react"
import PropTypes from "prop-types"
import AutoFixContext from "./autofit-context"

export default ({Text})=>class DocxText extends Component{
	static displayName="text"
	static contextTypes={
		style: PropTypes.object,
	}

	render(){
		const props={...this.context.style,...this.props}
		return (
			<AutoFixContext.Consumer>
				{({scale})=>{
					if(scale)
						console.log(`text font size autofit scaled from ${props.size} to ${props.size=Math.floor(props.size*parseInt(scale)/100000)}`)
					return <Text {...props}/>
				}}
			</AutoFixContext.Consumer>
		)
	}
}
