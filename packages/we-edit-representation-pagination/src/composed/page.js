import React, {Component} from "react"
import PropTypes from "prop-types"

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
		media: PropTypes.string,
		onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
	}

	state={display:false}

	render(){
		let {
			size:{width, height},
			margin:{left,top, right,bottom, header:headerStartAt=0, footer:footerEndAt=0},
			columns,
			header,
			footer,
			i:pageNo}=this.props

		let {media}=this.context

		let contents=[]

		if(header)
			contents.push(
				<Group key="header"
					x={left} y={headerStartAt}
					className="header">
					{header}
				</Group>
			)

		contents.push(
			<Group key="content"
				x={left} y={top}
				className="content">
				{columns.map((a,i)=><Group key={i} className="column" {...a}/>)}
			</Group>
		)

		if(footer)
			contents.push(
				<Group key="footer"
					x={left}
					y={height-footerEndAt-footer.props.height}
					className="footer">
					{footer}
				</Group>
			)

		if(media=="screen"){
			const {display}=this.state
			const {onPageShow=a=>a,onPageHide=a=>a}=this.context

			if(display){
				contents.unshift(
					<Margin key="margin"
						margin={{left,top,right:width-right,bottom:height-bottom}}/>
				)
			}else{
				contents=null
			}
			return(
				<Waypoint fireOnRapidScroll={false}
						onEnter={e=>this.setState({display:true},onPageShow)}
						onLeave={e=>this.setState({display:false},onPageHide)}>
					<g className="page">
						<Paper width={width} height={height} fill="white"/>
						{contents}
					</g>
				</Waypoint>
			)
		}else{
			return(
				<Group className="page" width={width} height={height}>
					{contents}
				</Group>
			)
		}
	}
}

const Paper=({width,height,...props})=>(
	<g>
		<rect {...props} {...{width,height}}/>
		<path d={`M0 0 L${width} 0 L${width} ${height} L0 ${height}Z`} 
			fill="none"
			strokeWidth={1} stroke="lightgray"/>
	</g>
)

const Margin=({margin:{left,top, right,bottom},marginWidth=20})=>(
	<g>
		<line x1={left} y1={top} x2={left-marginWidth} y2={top} strokeWidth={1} stroke="lightgray"/>
		<line x1={left} y1={top} x2={left} y2={top-marginWidth} strokeWidth={1} stroke="lightgray"/>

		<line x1={left} y1={bottom} x2={left-marginWidth} y2={bottom} strokeWidth={1} stroke="lightgray"/>
		<line x1={left} y1={bottom} x2={left} y2={bottom+marginWidth} strokeWidth={1} stroke="lightgray"/>

		<line x1={right} y1={bottom} x2={right+marginWidth} y2={bottom} strokeWidth={1} stroke="lightgray"/>
		<line x1={right} y1={bottom} x2={right} y2={bottom+marginWidth} strokeWidth={1} stroke="lightgray"/>

		<line x1={right} y1={top} x2={right+marginWidth} y2={top} strokeWidth={1} stroke="lightgray"/>
		<line x1={right} y1={top} x2={right} y2={top-marginWidth} strokeWidth={1} stroke="lightgray"/>
	</g>
)
