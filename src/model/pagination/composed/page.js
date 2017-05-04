import React, {PureComponent as Component, PropTypes} from "react"
import Waypoint from "react-waypoint"
import Group from "./group"
import Line from "./line"

export default class Page extends Component{
	static propTypes={
		columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		size: PropTypes.object.isRequired,
		margin: PropTypes.object,
		header: PropTypes.element,
		footer: PropTypes.element
	}

	static contextTypes={
		media: PropTypes.string
	}
	
	state={display:false}
	
	render(){
		let {
			size:{width, height}, 
			margin:{left,top, right,bottom, header:headerStartAt=0, footer:footerEndAt=0}, 
			columns, 
			header, 
			footer}=this.props
			
		let {media="print"}=this.context
		
		let elHeader=header ? (<Group x={left} y={headerStartAt} className="header">{header}</Group>) : null
		
		let elFooter=footer ? (<Group x={left} y={height-footerEndAt-footer.props.height} className="footer">{footer}</Group>) : null
		
		let content=(
					<Group x={left} y={top} className="content">
						{columns.map((a,i)=><Group key={i} {...a}/>)}
					</Group>
			)
			
		if(media=="screen"){
			const {display}=this.state
			return(
				<Waypoint fireOnRapidScroll={false}
						onEnter={e=>this.setState({display:true})} 
						onLeave={e=>this.setState({display:false})}>
					<g className="page">
							<Paper width={width} height={height} fill="white" 
								margin={{left,top,right:width-right,bottom:height-bottom}}/>
						
							{display ? elHeader : null}
							
							{display ? content : null}
							
							{display ? elFooter : null}
					</g>
				</Waypoint>
			)	
		}else{
			return(
				<Group className="page">
					{elHeader}
					{content}
					{elFooter}
				</Group>
			)		
		}
	}
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
