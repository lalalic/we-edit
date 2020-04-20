import React, {Component} from "react"
import PropTypes from "prop-types"
import Overlay from "./overlay"
import Group from "../group"

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

	static ColResizer=({onResize, onEnd, resizer, children, ...props})=>(
		<Resizable {...{onResize, onEnd, resizer}}>
			{children}
			<line {...{stroke:"transparent", strokeWidth:5, "data-direction":"ew",cursor:"col-resize",...props}}/>
		</Resizable>
	)
	static RowResizer=({onResize, onEnd, resizer, children, ...props})=>(
		<Resizable {...{onResize, onEnd, resizer}}>
			{children}
			<line {...{stroke:"transparent", strokeWidth:5, "data-direction":"-ns",cursor:"row-resize",...props}}/>
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
		const {children,spots=[], onEnd, direction, resizer}=this.props
		return (
			<Overlay.WhenMouseDown style={{cursor}}>
				<Group 	
					onMouseDown={e=>{
						e.stopPropagation()
						const {clientX:left, clientY:top,target}=e
						const {onStart}=this.props
						this.setState({
							resizing:e.target.dataset.direction||direction,
							cursor:target.style.cursor||target.getAttribute("cursor")||cursor
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
					{children}
					{spots.map(a=><Spot {...a}  key={a.direction}/>)}
					{resizing && resizer}
				</Group>
			</Overlay.WhenMouseDown>
		)
	}

	resize({clientX:left,clientY:top}){
		const {props:{onResize}, state:{resizing}}=this
		let x=left-this.left
		let y=top-this.top
		switch(resizing){
		case "-ns":
			y*=-1
		case "ns":
			if(y){
				if(false===onResize({y:-y})){
					return
				}
			}
		break
		case "-ew":
			x*=-1
		case "ew":
			if(x){
				if(false===onResize({x})){
					return
				}
			}
		break

		case "-nwse":
			x*=-1
		case "nwse":
			if(x && y){
				if(false===onResize({x:-x,y})){
					return
				}
			}
		break

		case "-nesw":
			x*=-1
		case "nesw":
			if(x && y){
				if(false===onResize({x,y})){
					return
				}
			}
		break
		}
		this.left=left
		this.top=top
	}
}

const Spot=(({width=5,height=5,x,y,direction,style={}, ...props})=><rect {...{
		"data-direction":direction,
		...props,
		width,height,
		x:x-width/2,
		y:y-height/2,
		style:{
			fill:"white",stroke:"lightgray",strokeWidth:1,
			cursor:`${direction.replace("-","")}-resize`,
			...style
		},
	}}/>
)

