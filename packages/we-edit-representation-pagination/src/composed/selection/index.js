import React, {Component} from "react"

import Range from "./range"

export default class SelectionShape extends Component{
	state={}
	onShrink=this.onShrink.bind(this)
	render(){
		const {rects=[], selecting}=this.state
		if(selecting){
			return <Area rects={this.state.rects} onMouseMove={this.onShrink} />
		}

		const {onMove}=this.props
		return (
			<Range onMove={onMove}>
				<Area rects={rects}/>
			</Range>
		)
	}

	static getDerivedStateFromProps({rects},{selecting}){
		if(!selecting)
			return {rects}
	}

	onShrink({buttons, clientX:left, clientY: top}){
		if(!(buttons&0x1))
			return
		const {asCanvasPoint}=this.props
		const {rects}=this.state
		const {x,y}=asCanvasPoint({left,top})

		let i=rects.findIndex(({left,top,right,bottom})=>top<=y && y<=bottom && left<=x && x<=right)
		let newRects=rects.slice(0,i+1)
		newRects[newRects.length-1].right=x-2
		this.setState({rects:newRects})
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
