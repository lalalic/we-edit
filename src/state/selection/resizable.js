import React, {Component, PropTypes} from "react"

import Overlay from "./overlay"

export default class Resizable extends Component{
	static propTypes={
		onResize: PropTypes.func.isRequired
	}
	state={}
	render(){
		const {resize}=this.state
		const {children}=this.props
		if(resize){
			return (
				<Overlay cursor="crosshair"
					onMouseUp={e=>this.setState({resize:undefined})}
					onMouseMove={e=>this.resize(e.clientX, e.clientY)}
					>
					{children}
				</Overlay>
			)
		}else{
			let onStartResize=this.onStartResize.bind(this)
			return (
				<g>
					{
						React.Children.map(children,
							a=>React.cloneElement(a,{onStartResize})
						)
					}
				</g>
			)
		}
	}
	onStartResize(resize,e){
		this.setState({resize})
		this.left=e.clientX
		this.top=e.clientY
	}

	resize(left,top){
		const {onResize}=this.props
		const {resize}=this.state
		let x=left-this.left
		let y=top-this.top
		switch(resize){
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