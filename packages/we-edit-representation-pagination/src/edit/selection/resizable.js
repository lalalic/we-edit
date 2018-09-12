import React, {Component} from "react"
import PropTypes from "prop-types"


import Overlay from "./overlay"

export default class Resizable extends Component{
	static propTypes={
		onResize: PropTypes.func.isRequired,
		direction: PropTypes.oneOf("ew,ns,nwse,nesw"，split(",").reduce((all,a)=>(all.splice(0,0,a,"-"+a),all),[]))
	}
	state={}
	this.onStartResize=this.onStartResize.bind(this)
	render(){
		const {resizing}=this.state
		const {children}=this.props
		if(resizing){
			return (
				<Overlay cursor="crosshair"
					onMouseUp={e=>this.setState({resizing:undefined})}
					onMouseMove={e=>this.resize(e.clientX, e.clientY)}
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
				<g>
					{
						React.Children.map(children,a=>React.cloneElement(a,props))
					}
				</g>
			)
		}
	}
	onStartResize(resizing,e){
		this.setState({resizing})
		this.left=e.clientX
		this.top=e.clientY
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
			y && onResize({y:-y})
		break
		case "-ew":
			x*=-1
		case "ew":
			x && onResize({x})
		break

		case "-nwse":
			x*=-1
		case "nwse":
			x && y && onResize({x:-x,y})
		break

		case "-nesw":
			x*=-1
		case "nesw":
			x && y && onResize({x,y})
		break
		}
		this.left=left
		this.top=top
	}
}