import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"
import {Group} from "../composed"

export default class Media extends Component{
	static contextTypes={
		media: PropTypes.string,
		paper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				border:PropTypes.bool
			})
		])
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
					{paper && <Paper {...{width,height,margin,fill:"white", precision,...paper}}/>}
					{display ? children : null}
				</g>
			</Waypoint>
		)
	}
}

const Paper=({width,height, margin:{left,right,top,bottom}, precision, border=true,
	strokeWidth=1*precision, marginWidth=20*precision, ...props})=>(
   <g className="paper">
	   <rect {...props} {...{width,height}}/>
	   {border && <path strokeWidth={strokeWidth} stroke="lightgray" fill="none" d={`
		   		M0 0 h${width} v${height} h${-width}z
				M${left-Math.min(left,marginWidth)} ${top} h${Math.min(left,marginWidth)} v${-Math.min(top,marginWidth)}
				M${left-Math.min(left,marginWidth)} ${height-bottom} h${Math.min(left,marginWidth)} v${Math.min(bottom,marginWidth)}
				M${width-right+Math.min(right,marginWidth)} ${height-bottom} h${-Math.min(right,marginWidth)} v${Math.min(bottom,marginWidth)}
				M${width-right+Math.min(right,marginWidth)} ${top} h${-Math.min(right,marginWidth)} v${-Math.min(top,marginWidth)}
			`}/>
		}
   </g>
)
