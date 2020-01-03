import React, {Component} from "react"
import PropTypes from "prop-types"
import Overlay from "./overlay"

export default class Rotatable extends Component{
	static propTypes={
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		r:PropTypes.number,
		degree: PropTypes.number,
	}
	static contextTypes={
		asCanvasPoint: PropTypes.func,
	}

	state={rotating:false}

	render(){
		const {r,x,y,onEnd, degree}=this.props
		const style={fill:"white",stroke:"lightgray",strokeWidth:1}
		const props={width:2*r,height:2*r,style,x:x-r,y:y-r}
		const {rotating}=this.state
		if(!rotating)
			return (<use xlinkHref="#rotator" {...props} onMouseDown={e=>this.onStartRotate(e)}/>)
		return (
			<Overlay cursor="crosshair"
				onMouseUp={e=>{
					this.setState({rotating:undefined})
					if(onEnd)
						onEnd()
					e.stopPropagation()
				}}
				onMouseMove={e=>{
					this.rotate(e)
					e.stopPropagation()
				}}
				>
				<text x={x+2*r} y={y}>{degree}</text>
				<use xlinkHref="#rotator" {...props}/>
			</Overlay>
		)
	}

	onStartRotate({clientX,clientY}){
		this.setState({rotating:true})
		this.left=clientX
		this.top=clientY
	}

	rotate({clientX:left,clientY:top}){
		const {onRotate,degree=0}=this.props
		const dx=left-this.left, dy=top-this.top
		var dd=parseInt(Math.atan2(dy,dx)*180/Math.PI)
		if(dd<0)
			dd+=360
		if(false!=onRotate({degree:(degree+dd)%360})){
			this.left=left
			this.top=top
		}
	}
}
