import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "we-edit"

import Overlay from "./overlay"
import Top from "./top"

const NoShow="transparent"
const Resizer=connect()(class __$1 extends Component{
	constructor(){
		super(...arguments)
		this.state={resizing:false}
		this.resize=a=>this.props.onResize(a,this.props.dispatch)
	}
	render(){
		const {resizing}=this.state
		const {dispatch,onResize,direction="ew", cursor="col-resize", top={x:0,y:0},...props}=this.props
		const y=direction=="ew" ? 'y' :'x'
		const topLine={[y+'1']:"-100%", [y+'2']:"100%"}
		return (
			<Fragment>
				{resizing &&
					<Top {...top}>
						<line {...props} {...topLine}
							stroke="lightgray"
							strokeWidth={1}
							strokeDasharray="5,5"/>
					</Top>
				}
				<Resizable
					direction={direction}
					onStart={e=>this.setState({resizing:true})}
					onEnd={e=>this.setState({resizing:false})}
					onResize={this.resize}>
					<line {...props}
						stroke={NoShow}
						strokeWidth={5}
						style={{cursor}}
						/>
				</Resizable>
			</Fragment>
		)
	}
})
	
export default class Resizable extends Component{
	static propTypes={
		onResize: PropTypes.func.isRequired,
		direction: PropTypes.oneOf("ew,ns,nwse,nesw".split(",").reduce((all,a)=>(all.splice(0,0,a,"-"+a),all),[]))
	}

	static ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
	static RowResizer=props=><Resizer {...props} direction="-ns" cursor="row-resize"/>
	
	state={}
	onStartResize=this.onStartResize.bind(this)

	render(){
		const {resizing,cursor}=this.state
		const {children,spots=[], onEnd}=this.props
		if(resizing){
			return (
				<Overlay
					onMouseUp={e=>{
						this.setState({resizing:undefined})
						if(onEnd)
							onEnd()
						e.stopPropagation()
					}}
					onMouseMove={e=>{
						this.resize(e.clientX, e.clientY)
						e.stopPropagation()
					}}
					style={{cursor}}
					>
					{children}
					{spots.map(a=><Spot key={a.resize} {...a}/>)}
				</Overlay>
			)
		}
		
		const {direction}=this.props
		const props={}
		if(direction){
			props.onMouseMove=e=>{
				if(e.buttons&0x1){
					this.onStartResize(direction,e)
					e.stopPropagation()
				}
			}
		}else{
			props.onStartResize=this.onStartResize
		}
		return (
			<Fragment>
				{children}
				{spots.map(a=><Spot key={a.resize} {...a} {...props}/>)}}
			</Fragment>
		)
	}
	onStartResize(resizing,e){
		this.setState({resizing,cursor:e.target.style.cursor})
		this.left=e.clientX
		this.top=e.clientY
		const {onStart}=this.props
		if(onStart)
			onStart()
	}

	resize(left,top){
		const {onResize}=this.props
		const {resizing}=this.state
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

const Spot=({width=5,height=5,x,y,resize,onStartResize})=>{
	const style={fill:"white",stroke:"lightgray",strokeWidth:1}
	const props={
		width,height,style,
		x:x-width/2,
		y:y-height/2
	}

	if(resize){
		style.cursor=`${resize.replace("-","")}-resize`
		props.onMouseDown=e=>onStartResize(resize,e)
	}

	return <rect {...props}/>
}


