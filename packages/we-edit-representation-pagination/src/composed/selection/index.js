import React, {Component} from "react"

import Entity from "./entity"
import Range from "./range"

export default class extends Component{
	render(){
		const {onMove, rects}=this.props
		if(!rects)
			return null
		return (
			<Range onMove={onMove}>
				<path
					fill="#3297FD"
					style={{fillOpacity:0.5}}
					d={
						rects.map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ")
					}/>
			</Range>
		)
	}
}
