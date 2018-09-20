import React, {Component} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"
import Group from "../composed/group"

export default class Media extends Component{
	static contextTypes={
		media: PropTypes.string,
		paper: PropTypes.bool,
		onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
		scrollableAncestor: PropTypes.any,
	}

	render(){
		const {children:pages, pgGap, width}=this.props
		const {paper=true,media,onPageHide,onPageShow,scrollableAncestor}=this.context
		switch(media){
			case "screen":{
				let y=0
				return (
					<Group y={pgGap} x={0}>
						{pages.map((page,i)=>{
							let {size,margin}=page.props

							let newPage=(
								<Group y={y} x={(width-size.width)/2} key={i}>
									{paper && <Paper {...{size,margin,fill:"white"}}/>}
									<SmartShow {...{onPageHide,onPageShow,scrollableAncestor}}>
										{page}
									</SmartShow>
								</Group>
							)
							y+=(size.height+pgGap)
							return newPage
						})}
					</Group>
				)
			}
			default:
				return pages
		}
	}
}

class SmartShow extends Component{
	state={display:false}
	render(){
		const {display}=this.state
		const {children, onPageShow, onPageHide, scrollableAncestor}=this.props
		return (
			<Waypoint fireOnRapidScroll={false}   scrollableAncestor={scrollableAncestor}
				onEnter={e=>this.setState({display:true},onPageShow)}
				onLeave={e=>this.setState({display:false},onPageHide)}>
				{display ? children : <g/>}                                                                                       		
			</Waypoint>
		)

	}
}

const Paper=({size:{width,height}, margin:{left,right,top,bottom},...props})=>(
       <g>
		   <rect {...props} {...{width,height}}/>
		   <path d={`M0 0 L${width} 0 L${width} ${height} L0 ${height}Z`}
				   fill="none"
				   strokeWidth={1} stroke="lightgray"/>
			{left&&right&&top&&bottom&&
				<Margin margin={{left,top,right:width-right,bottom:height-bottom}}/>
			}
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
