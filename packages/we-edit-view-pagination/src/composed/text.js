import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"


export const Text=({children, contentWidth, whiteSpace, height, width, descent,...others})=>(
	<text style={{whiteSpace:"pre"}} {...others}>
	{
		children.join("")
	}
	</text>
)

export default Text
