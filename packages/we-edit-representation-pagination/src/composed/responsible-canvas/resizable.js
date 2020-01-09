import React, {Component,Fragment} from "react"
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
		spots: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
			direction,
			width: PropTypes.number,
			height: PropTypes.number,
		}))
	}

	constructor(){
		super(...arguments)
		this.state={}
	}

	render(){
		const {resizing,cursor}=this.state
		const {children,spots=[], onEnd, direction}=this.props
		if(resizing){
			return (
				<Overlay
					onMouseUp={e=>{
						e.stopPropagation()
						this.setState({resizing:false})
						onEnd && onEnd()
					}}
					onMouseMove={e=>{
						e.stopPropagation()
						this.resize(e)
					}}
					style={{cursor}}
					>
					{children}
					{spots.map(a=><Spot key={a.direction} {...a}/>)}
				</Overlay>
			)
		}
		
		return (
			<Fragment>
				{direction ? React.cloneElement(React.Children.only(children),{onMouseDown:e=>this.startResize(direction,e)}) : children}
				{spots.map(a=><Spot key={a.direction} {...a} onMouseDown={e=>this.startResize(a.direction,e)}/>)}}
			</Fragment>
		)
	}

	startResize(resizing,e){
		console.log('resizer mouse down')
		e.stopPropagation()
		const {clientX:left, clientY:top,target:{style:{cursor}}}=e
		const {onStart}=this.props
		this.setState({resizing,cursor})
		onStart && onStart()
		this.left=left
		this.top=top
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


