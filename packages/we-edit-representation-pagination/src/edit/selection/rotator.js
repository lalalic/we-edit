import React, {Component} from "react"
import PropTypes from "prop-types"

import Overlay from "./overlay"
import Group from "../../composed/group"


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
				<svg viewBox="0 0 24 24" {...props}>
					<circle cx={12} cy={12} r={15}
						stroke="transparent" fillOpacity={0.01}
						cursor="pointer"/>
					<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
				</svg>
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
