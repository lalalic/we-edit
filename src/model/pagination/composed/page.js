import React, {PureComponent as Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export const Page=({
			size:{width, height}, 
			margin:{left,top, right,bottom, header:headerStartAt=0, footer:footerEndAt=0}, 
			columns, 
			header, 
			footer},{media="print"})=>(
	<Group className="page">
		{media!=="print" ? <Paper width={width} height={height} fill="white" 
			margin={{left,top,right:width-right,bottom:height-bottom}}/> : null}
		
		{header ? (<Group x={left} y={headerStartAt} className="header">{header}</Group>) : null}
		
		<Group x={left} y={top} className="content">
			{columns.map((a,i)=><Group key={i} {...a}/>)}
		</Group>
		
		{footer ? (<Group x={left} y={height-footerEndAt-footer.props.height} className="footer">{footer}</Group>) : null}
		
	</Group>
)

Page.propTypes={
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	size: PropTypes.object.isRequired,
	margin: PropTypes.object,
	header: PropTypes.element,
	footer: PropTypes.element
}

Page.contextTypes={
	media: PropTypes.string
}

const Paper=({margin:{left,top, right,bottom},marginWidth=20,...others})=>(
	<g>
		<rect {...others}/>
		<line x1={left} y1={top} x2={left-marginWidth} y2={top} strokeWidth={1} stroke="gray"/>
		<line x1={left} y1={top} x2={left} y2={top-marginWidth} strokeWidth={1} stroke="gray"/>
		
		<line x1={left} y1={bottom} x2={left-marginWidth} y2={bottom} strokeWidth={1} stroke="gray"/>
		<line x1={left} y1={bottom} x2={left} y2={bottom+marginWidth} strokeWidth={1} stroke="gray"/>
		
		<line x1={right} y1={bottom} x2={right+marginWidth} y2={bottom} strokeWidth={1} stroke="gray"/>
		<line x1={right} y1={bottom} x2={right} y2={bottom+marginWidth} strokeWidth={1} stroke="gray"/>
		
		<line x1={right} y1={top} x2={right+marginWidth} y2={top} strokeWidth={1} stroke="gray"/>
		<line x1={right} y1={top} x2={right} y2={top-marginWidth} strokeWidth={1} stroke="gray"/>
	</g>
)

export default Page
