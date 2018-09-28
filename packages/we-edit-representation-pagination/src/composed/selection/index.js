import React, {Component} from "react"

import Range from "./range"

export default class SelectionShape extends Component{
	render(){
		const {onMove, rects=[]}=this.props
		return (
			<Range onMove={onMove}>
				<Area rects={rects}/>
			</Range>
		)
	}

	componentWillUnmount(){
		console.log("selection unmounted")
	}
}

export const Area=({rects, ...props})=>(
	<path
		fill="#3297FD"
		style={{fillOpacity:0.5}}
		d={
			rects.map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ")
		}
		{...props}
		/>
)
