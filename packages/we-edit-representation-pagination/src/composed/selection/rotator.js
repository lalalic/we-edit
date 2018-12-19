import React, {Component} from "react"
import PropTypes from "prop-types"

import Overlay from "./overlay"
import {Group} from "../../composed"


export default class Rotator extends Component{
	static propTypes={
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		r:PropTypes.number
	}

	state={rotating:false}

	render(){
		const {r,x,y,onRotate}=this.props
		const style={
			fill:"white",
			stroke:"lightgray",
			strokeWidth:1
		}
		let props={
			width:2*r,
			height:2*r,
			style,
			x:x-r,
			y:y-r
		}
		props.onMouseDown=e=>this.onStartResize(e)

		const {rotating}=this.state
		let overlay=null
		if(rotating){
			overlay=<Overlay cursor="crosshair"
				onMouseUp={e=>this.setState({rotating:false})}
				onMouseMove={e=>{
					let x=e.clientX-this.left
					let y=e.clientY-this.top
					x && y && onRotate(x,y)
					this.left=e.clientX
					this.top=e.clientY
				}}
				/>
		}
		return (
			<Group>
				<use xlinkHref="#rotator" {...props}/>
				{overlay}
			</Group>
		)
	}

	onStartResize(e){
		this.setState({rotating:true})
		this.left=e.clientX
		this.top=e.clientY
	}
}
