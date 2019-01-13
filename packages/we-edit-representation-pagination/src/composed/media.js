import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"
import {Group} from "../composed"

export default class Media extends Component{
	static contextTypes={
		media: PropTypes.string,
		paper: PropTypes.bool,
		onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
		scrollableAncestor: PropTypes.any,
	}

	render(){
		const {children:pages, pgGap, width:canvasWidth, precision,
			media=this.context.media,
			paper=this.context.paper,
			smart=true,
		}=this.props
		const {onPageHide,onPageShow,scrollableAncestor}=this.context
		switch(media){
			case "screen":{
				let y=0
				return (
					<Group y={pgGap} x={0}>
						{pages.map((page,i)=>{
							let {width,height,margin}=page.props

							let newPage=(
								<Group key={i} {...{y, x:(canvasWidth-width)/2}}>
									{paper!==false && <Paper {...{width,height,margin,fill:"white", precision}}/>}
									{smart ? <SmartShow {...{onPageHide,onPageShow,scrollableAncestor,children:page}}/> : page}
								</Group>
							)
							y+=(height+pgGap)
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
				<g>
				{display ? children : <g style={{visibility:"hidden"}}>{children}</g>}
				</g>
			</Waypoint>
		)
	}
}

const Paper=({width,height, margin:{left,right,top,bottom},precision,...props})=>(
       <g className="paper">
		   <rect {...props} {...{width,height}}/>
		   <path d={`M0 0 L${width} 0 L${width} ${height} L0 ${height}Z`}
				   fill="none"
				   strokeWidth={1} stroke="lightgray"/>
			{left&&right&&top&&bottom&&
				<Margin margin={{left,top,right:width-right,bottom:height-bottom}} precision={precision}/>
			}
       </g>
)

const Margin=({precision,margin:{left,top, right,bottom},marginWidth=20*precision, strokeWidth=1*precision})=>(
       <Fragment>
               <line x1={left} y1={top} x2={left-marginWidth} y2={top} strokeWidth={strokeWidth} stroke="lightgray"/>
               <line x1={left} y1={top} x2={left} y2={top-marginWidth} strokeWidth={strokeWidth} stroke="lightgray"/>

               <line x1={left} y1={bottom} x2={left-marginWidth} y2={bottom} strokeWidth={strokeWidth} stroke="lightgray"/>
               <line x1={left} y1={bottom} x2={left} y2={bottom+marginWidth} strokeWidth={strokeWidth} stroke="lightgray"/>

               <line x1={right} y1={bottom} x2={right+marginWidth} y2={bottom} strokeWidth={strokeWidth} stroke="lightgray"/>
               <line x1={right} y1={bottom} x2={right} y2={bottom+marginWidth} strokeWidth={strokeWidth} stroke="lightgray"/>

               <line x1={right} y1={top} x2={right+marginWidth} y2={top} strokeWidth={strokeWidth} stroke="lightgray"/>
               <line x1={right} y1={top} x2={right} y2={top-marginWidth} strokeWidth={strokeWidth} stroke="lightgray"/>
       </Fragment>
)
