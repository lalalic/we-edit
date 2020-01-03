import React, {Component} from "react"
import Movable from "./movable"

export default class SelectionShape extends Component{
	constructor(){
		super(...arguments)
		this.state={}
		this.onShrink=this.onShrink.bind(this)
	}

	render(){
		const {onMove}=this.props
		const {rects=[], selecting}=this.state
		
		const range=<Area rects={rects}/>
		if(selecting)
			return React.cloneElement(range,{onMouseMove:this.onShrink})
		
		return onMove ? <Movable children={range} onMove={onMove}/> : range
	}

	static getDerivedStateFromProps({rects},{selecting}){
		if(!selecting)
			return {rects}
		return null
	}

	onShrink({buttons, clientX:left, clientY: top}){
		if(!(buttons&0x1))
			return
		const {asCanvasPoint}=this.props
		const {rects}=this.state
		const {x,y}=asCanvasPoint({left,top})

		let i=rects.findIndex(({left,top,right,bottom})=>y<=bottom && left<=x && x<=right)
		let newRects=rects.slice(0,i+1)
		if(i!=-1){
			newRects[newRects.length-1].right=x-2
		}
		this.setState({rects:newRects})
	}
}

export const Area=({rects, ...props})=>(
	<path
		fill="#3297FD"
		className="selectionShape"
		style={{fillOpacity:0.5}}
		d={
			rects.map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ")
		}
		{...props}
		onClick={e=>console.log(1)}
		/>
)
