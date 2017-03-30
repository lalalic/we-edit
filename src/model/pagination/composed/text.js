import React, {PureComponent as Component, PropTypes} from "react"

export const Text=({children, contentWidth, whiteSpace, ...others})=>(
	<text style={{whiteSpace:"pre"}} {...others} unselectable="on">
	{
		children.join("")
	}	
	</text>
)

export default Text