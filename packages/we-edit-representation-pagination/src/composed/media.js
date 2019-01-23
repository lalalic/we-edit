import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"
import {Group} from "../composed"

export default class Media extends Component{
	static contextTypes={
		media: PropTypes.string,
		paper: PropTypes.bool,
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
								<Group key={i} {...{y, x:(canvasWidth-width)/2}} className="page">
									{smart ? <SmartShow {...{
										children:page,i,
										width,height,margin,
										paper,
										precision,
									}}/> : page}
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
		const {children,i,width,height,margin,paper,precision}=this.props
		return (
			<Waypoint fireOnRapidScroll={false}
				onEnter={e=>{this.setState({display:true})}}
				onLeave={e=>this.setState({display:false})}>
				<g>
					{paper!==false && <Paper {...{width,height,margin,fill:"white", precision}}/>}
					{display ? children : null}
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
			<Margin margin={{left,top,right:width-right,bottom:height-bottom}} precision={precision}/>
       </g>
)

const Margin=({precision,margin:{left,top, right,bottom},marginWidth=20*precision, strokeWidth=1*precision})=>(
	<path strokeWidth={strokeWidth} stroke="lightgray" fill="none" d={`
		M${left-marginWidth} ${top} h${marginWidth} v${-marginWidth}
		M${left-marginWidth} ${bottom} h${marginWidth} v${marginWidth}
		M${right+marginWidth} ${bottom} h${-marginWidth} v${marginWidth}
		M${right+marginWidth} ${top} h${-marginWidth} v${-marginWidth}
	`}/>
)
