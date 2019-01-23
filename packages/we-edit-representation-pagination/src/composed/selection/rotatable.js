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
		const {r,x,y,onEnd}=this.props
		const style={
			fill:"white",
			stroke:"lightgray",
			strokeWidth:1
		}
		const props={
			width:2*r,
			height:2*r,
			style,
			x:x-r,
			y:y-r
		}
		const {rotating}=this.state
		if(rotating){
			return (
				<Overlay cursor="crosshair"
					onMouseUp={e=>{
						this.setState({rotating:undefined})
						if(onEnd)
							onEnd()
						e.stopPropagation()
					}}
					onMouseMove={e=>{
						this.rotate(e.clientX, e.clientY)
						e.stopPropagation()
					}}
					>
					<use xlinkHref="#rotator" {...props}/>
				</Overlay>
			)
		}else{
			return (
				<use xlinkHref="#rotator" {...props} onMouseDown={e=>this.onStartResize(e)}/>
			)
		}
	}

	onStartResize(e){
		this.setState({rotating:true})
		this.left=e.clientX
		this.top=e.clientY
		const {onStart}=this.props
		if(onStart)
			onStart()
	}
	
	rotate(left,top){
		const {onRotate}=this.props
		let x=left-this.left
		let y=top-this.top
		if(false!==onRotate({x,y})){
			this.left=left
			this.top=top
		}
	}
}
