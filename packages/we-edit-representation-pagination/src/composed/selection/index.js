import React, {Component,Fragment} from "react"

import Movable from "./movable"

export default class SelectionShape extends Component{
	constructor(){
		super(...arguments)
		this.state={}
		this.onShrink=this.onShrink.bind(this)
	}

	render(){
		const {onMove,onResize,onRotate,shape,around}=this.props
		const {rects=[], selecting}=this.state
		var range=null, focus=null

		if(selecting){
			range=<Area rects={rects} onMouseMove={this.onShrink} />
		}else{
			range=<Area rects={rects}/>
			if(onMove)
				range=<Movable onMove={onMove} around={around} children={range}/>
		}

		if(shape){
			focus=React.cloneElement(shape,{onMove,onResize,onRotate,around, ...shape.props})
		}

		return (<Fragment>{range}{focus}</Fragment>)
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
		style={{fillOpacity:0.5}}
		d={
			rects.map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ")
		}
		{...props}
		onClick={e=>console.log(1)}
		/>
)
