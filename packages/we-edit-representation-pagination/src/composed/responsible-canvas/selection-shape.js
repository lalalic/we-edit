import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange,ACTION, whenSelectionChangeDiscardable} from "we-edit"
import Movable from "./movable"

export const SelectionShape= whenSelectionChange(({selection})=>{
	return selection ? {selection,rects:selection.getRangeRects()} : {}
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
		const {state:{rects=[], selecting}, props:{dispatch, ...props}}=this
		const range=<Area rects={rects} innerRef={this.area}/>
		if(selecting)
			return React.cloneElement(range,{onMouseMove:this.onShrink})
		
		return <g {...props}>{this.context.editable ? <Movable children={range} onMove={this.onMove}/> : range}</g>
	}

	static getDerivedStateFromProps({rects, selection},{selecting, ...last}){
		if(last.selection!=selection)//event is not correct, then fix it
			selecting=false
		if(!selecting)
			return {rects,selection,start:undefined, end:undefined, page:undefined, selecting:false}
		return {selection}
	}

	onShrink({buttons, clientX:left, clientY: top}){
		if(!(buttons&0x1))
			return
		const {selection}=this.props
		const {rects}=this.state
		const {x,y}=selection.positioning.asCanvasPoint({left,top})

		let i=rects.findIndex(({left,top,right,bottom})=>y<=bottom && left<=x && x<=right)
		let newRects=rects.slice(0,i+1)
		if(i!=-1){
			newRects[newRects.length-1].right=x-2
		}
		this.setState({rects:newRects})
	}

	onMove(e){
		this.props.dispatch(ACTION.Selection.MOVE(e))
	}

	componentDidMount(){
		this.componentDidUpdate({})
	}

	componentDidUpdate(prev){
		const selection=this.props.selection
		if(prev.selection!=selection && selection && selection.isRange){
			if(selection.isSelectionChanged(prev.selection)){
				const shape=this.area.current
				const {width,height}=shape.getBoundingClientRect()
				if(width*height!=0){
					if(shape.scrollIntoViewIfNeeded)
						shape.scrollIntoViewIfNeeded(true)
					else
						shape.scrollIntoView()
				}
			}
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
			(rects||[]).map(({left,top,right,bottom})=>`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`).join(" ")
		}
		{...props}
		/>
)

export const WorkerSelection=whenSelectionChangeDiscardable()(
	class WorkerSelection extends Component{
		static contextTypes={
			precision: PropTypes.number,
			hintMeasure: PropTypes.object,
		}
		render(){
			const {
				props:{name,selection,start,end, dispatch, ...props}, 
				context:{precision, hintMeasure:{style:{fonts, size}}}}=this
			const rects=(start?.id && end?.id && !(start.id==end.id && start.at==end.at)) && selection?.positioning.getRangeRects(start,end) || []
			const [{left:x=0,top:y=0}={}]=rects
			return (
				<g {...props}>
					<text {...{x,y:y-2,fontFamily:fonts,fontSize:size}}>{name}</text>
					<Area rects={rects}/>
				</g>
			)
		}
	}
)