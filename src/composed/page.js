import React, {Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export const Page=({
			size:{width, height}, 
			margin:{left,top, bottom, header:headerStartAt=0, footer:footerEndAt=0}, 
			columns, 
			header, 
			footer})=>(
	<Group className="page">
		<Paper width={width} height={height} fill="white"/>
		
		{header && (<Group x={left} y={headerStartAt} className="header">{header}</Group>)}
		
		<Group x={left} y={top} className="content">
			{columns.map((a,i)=><Group key={i} {...a}/>)}
		</Group>
		
		{footer && (<Group x={left} y={height-footerEndAt-footer.props.height} className="footer">{footer}</Group>)}
		
	</Group>
)

Page.propTypes={
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	size: PropTypes.object.isRequired,
	margin: PropTypes.object,
	header: PropTypes.element,
	footer: PropTypes.element
}

const Paper=props=><rect {...props}/>

export default Page
