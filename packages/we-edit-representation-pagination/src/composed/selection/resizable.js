import React, {Component} from "react"
import PropTypes from "prop-types"

import {Group} from "../../composed"
import Overlay from "./overlay"

export default class Resizable extends Component{
	static propTypes={
		onResize: PropTypes.func.isRequired,
		direction: PropTypes.oneOf("ew,ns,nwse,nesw".split(",").reduce((all,a)=>(all.splice(0,0,a,"-"+a),all),[]))
	}
	state={}
	onStartResize=this.onStartResize.bind(this)

	render(){
		const {resizing,cursor}=this.state
		const {children, onEnd}=this.props
		if(resizing){
			return (
				<Overlay
					onMouseUp={e=>{
						this.setState({resizing:undefined})
						if(onEnd)
							onEnd()
					}}
					onMouseMove={e=>{
						this.resize(e.clientX, e.clientY)
					}}
					style={{cursor}}
					>
					{children}
				</Overlay>
			)
		}else{
			let props={}
			const {direction}=this.props
			if(direction){
				props.onMouseDown=e=>this.onStartResize(direction,e)
			}else{
				props.onStartResize=this.onStartResize
			}
			return (
				<Group>
					{
						React.Children.map(children,a=>React.cloneElement(a,props))
					}
				</Group>
			)
		}
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
