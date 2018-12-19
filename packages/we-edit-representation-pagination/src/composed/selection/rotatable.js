import React, {Component} from "react"
import PropTypes from "prop-types"

import Overlay from "./overlay"
import {Group} from "../../composed"


export default class Rotatable extends Component{
	static propTypes={
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		r:PropTypes.number,
		onRotate: PropTypes.func.isRequired
	}

	state={}
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

		let rotator=(<use xlinkHref="#rotator" {...props}/>)

		const {rotate}=this.state
		let overlay=null
		if(rotate){
			return (
				<Group>
					{rotator}
					<Overlay cursor="crosshair"
						onMouseUp={e=>this.setState({rotate:undefined})}
						onMouseMove={e=>{
							let x=e.clientX-this.left
							let y=e.clientY-this.top
							x && y && onRotate(x,y)
							this.left=e.clientX
							this.top=e.clientY
						}}/>
				</Group>
			)

		}else{
			return rotator
		}
	}

	onStartResize(e){
		this.setState({rotate:true})
		this.left=e.clientX
		this.top=e.clientY
	}
}
