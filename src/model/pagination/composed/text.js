import React, {PureComponent as Component, PropTypes} from "react"

export const Text=({children, contentWidth, whiteSpace, height, width, descent,...others})=>(
	<text style={{whiteSpace:"pre"}} {...others}>
	{
		children.join("")
	}
	</text>
)

export default Text
