import React, {Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange} from "we-edit"
import Movable from "./movable"

export default whenSelectionChange(({selection})=>{
	const asCanvasPoint=a=>selection.positioning.asCanvasPoint(a)
	if(selection && selection.isRange){
		return {
			rects:selection.positioning.getRangeRects(selection.start, selection.end),
			asCanvasPoint,
		}
	}
	return {rects:[],asCanvasPoint}
},undefined,undefined,{withRef:true})(class SelectionShape extends Component{
	static contextTypes={
		editable: PropTypes.any
	}
	constructor(){
		super(...arguments)
		this.state={}
		this.onShrink=this.onShrink.bind(this)
		this.onMove=this.onMove.bind(this)
	}
	render(){
		const {rects=[], selecting}=this.state
		const {editable}=this.context
		const range=<Area rects={rects}/>
		if(selecting)
			return React.cloneElement(range,{onMouseMove:this.onShrink})
		
		return editable ? <Movable children={range} onMove={this.onMove}/> : range
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

	onMove(){
		this.props.dispatch(dispatch(ACTION.Selection.MOVE(e)))
	}
})

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
