import React, {PureComponent as Component, PropTypes} from "react"

import Group from "./group"

export const Frame=({margin:{left,top}, columns})=>(
	<Group x={left} y={top}>
		{columns.map((a,i)=><Group key={i} {...a}/>)}
	</Group>
)

Frame.propTypes={
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	size: PropTypes.object.isRequired,
	margin: PropTypes.object
}

export default Frame
