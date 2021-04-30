import React, {Component} from "react"
import PropTypes from "prop-types"
import Overlay from "./overlay"

/**
 * resizable support two types:
 * 1. spots for multiple directions, or 
 * 2. a single direction 
 */
const direction=PropTypes.oneOf("ew,ns,nwse,nesw".split(",").reduce((all,a)=>(all.splice(0,0,a,"-"+a),all),[]))
export default class Resizable extends Component{
	static propTypes={
		direction,
		onResize: PropTypes.func.isRequired,
		onEnd: PropTypes.func,
		resizer: PropTypes.node,
		spots: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
			direction,
			width: PropTypes.number,
			height: PropTypes.number,
		}))
	}

	static contextTypes={
		precision: PropTypes.number
	}

	

	static ColResizer=({onResize, onEnd, resizer, children, ...props},{precision=1})=>(
		<Resizable {...{onResize, onEnd, resizer}}>
			{children}
			<line {...{stroke:"transparent", strokeWidth:5*precision, "data-direction":"ew",cursor:"col-resize",...props}}/>
		</Resizable>
	)
	static RowResizer=({onResize, onEnd, resizer, children, ...props},{precision=1})=>(
		<Resizable {...{onResize, onEnd, resizer}}>
			{children}
			<line {...{stroke:"transparent", strokeWidth:5*precision, "data-direction":"-ns",cursor:"row-resize",...props}}/>
		</Resizable>
	)

	constructor(){
		super(...arguments)
		this.state={}
	}

	static getDerivedStateFromProps({cursor},state){
		return {cursor, ...state}
	}

	render(){
		const {cursor,resizing}=this.state
		const {children,spots=[], onEnd, onStart, direction, resizer}=this.props
		return (
			<Overlay.WhenMousePressedMove 
				style={{cursor}}
				onStart={e=>{
					e.stopPropagation()
					const {clientX:left, clientY:top,nativeEvent:{target}}=e
					this.setState({
						resizing:target.dataset.direction||direction,
						cursor:target.style.cursor||target.getAttribute("cursor")||cursor,
						control: target.dataset.control,
					})
					onStart && onStart()
					this.left=left
					this.top=top
				}}
				onMouseUp={e=>{
					e.stopPropagation()
					this.setState({resizing:false})
					onEnd && onEnd()
				}}
				onMouseMove={e=>{
					e.stopPropagation()
					this.resize(e)
				}}
				>
				<g onMouseDown={e=>e.stopPropagation()}>
					{children}
					{spots.map((a,key)=><Spot {...a}  key={key}/>)}
					{resizing && resizer}
				</g>
			</Overlay.WhenMousePressedMove>
		)
	}

	resize({clientX:left,clientY:top}){debugger
		const {props:{onResize}, state:{resizing,control}}=this
		let x=left-this.left, y=top-this.top
		switch(resizing){
			case "-ns":
				y*=-1
			case "ns":
				if(y){
					if(false===onResize({y:-y,control})){
						return
					}
				}
			break
			case "-ew":
				x*=-1
			case "ew":
				if(x){
					if(false===onResize({x,control})){
						return
					}
				}
			break

			case "-nwse":
				x*=-1
			case "nwse":
				if(x && y){
					if(false===onResize({x:-x,y,control})){
						return
					}
				}
			break

			case "-nesw":
				x*=-1
			case "nesw":
				if(x && y){
					if(false===onResize({x,y,control})){
						return
					}
				}
			break
			default:
				if(false===onResize({x,y,direction:resizing,control})){
					return 
				}
		}
		this.left=left
		this.top=top
	}
}

const Spot=(({width=5,height=5,x,y,direction="",style={},control, ...props},{precision=1})=><rect {...{
		"data-direction":direction,
		"data-control":control,
		...props,
		width:width*precision,height:height*precision,
		x:x-width*precision/2,
		y:y-height*precision/2,
		style:{
			fill:"white",stroke:"lightgray",strokeWidth:1*precision,
			cursor:`${direction.replace("-","")}-resize`,
			...style
		},
	}}/>
)

Spot.contextTypes= Resizable.RowResizer.contextTypes=Resizable.ColResizer.contextTypes={
	precision: PropTypes.number,
}

