import React, {Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange} from "we-edit"
import Movable from "./movable"

export default whenSelectionChange(({selection})=>{
	return {rects:selection && selection.getRangeRects(),selection}
},undefined,undefined,{withRef:true})(class SelectionShape extends Component{
	static contextTypes={
		editable: PropTypes.any
	}
	constructor(){
		super(...arguments)
		this.area=React.createRef()
		this.state={}
		this.onShrink=this.onShrink.bind(this)
		this.onMove=this.onMove.bind(this)
	}
	render(){
		const {rects=[], selecting, selection}=this.state
		const {editable}=this.context
		const range=<Area rects={rects} innerRef={this.area}/>
		if(selecting)
			return React.cloneElement(range,{onMouseMove:this.onShrink})
		
		return editable ? <Movable children={range} onMove={this.onMove} positioning={selection&&selection.positioning}/> : range
	}

	static getDerivedStateFromProps({rects},{selecting}){
		if(!selecting)
			return {rects}
		return null
	}

	onShrink({buttons, clientX:left, clientY: top}){
		if(!(buttons&0x1))
			return
		const {selection, positioning=selection.positioning}=this.props
		const {rects}=this.state
		const {x,y}=positioning.asCanvasPoint({left,top})

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

	componentDidMount(){
		this.componentDidUpdate({})
	}

	componentDidUpdate(prev){
		const selection=this.props.selection
		if(prev.selection!=selection && selection.isRange){
			const shape=this.area.current
			if(shape.scrollIntoViewIfNeeded)
				shape.scrollIntoViewIfNeeded(true)
			else
				shape.scrollIntoView()
		}
	}
})

export const Area=({rects, innerRef,...props})=>(
	<path
		ref={innerRef}
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
