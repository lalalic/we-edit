import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import Overlay from "./overlay"

export default class Rotatable extends Component{
	static propTypes={
		x:PropTypes.number.isRequired,
		r:PropTypes.number,
		degree: PropTypes.number,
	}
	
	state={rotating:false}

	render(){
		const {props:{r=12,x,y,onEnd, degree=0, onRotate},state:{rotating}}=this
		const rotator={
			width:2*r,height:2*r,x:x-r,y:-2*r,
			style:{fill:"white",stroke:"lightgray",strokeWidth:1},
		}

		return(
			<Overlay.WhenMousePressedMove
				style={{cursor:"crosshair"}}
				onStart={e=>{
					e.stopPropagation()
					this.setState({rotating:true})
				}}
				onMouseUp={e=>{
					e.stopPropagation()
					this.setState({rotating:false})
					if(onEnd)
						onEnd()
				}}
				onMouseMove={e=>{
					e.stopPropagation()
					onRotate(e)
				}}>
					{rotating && <text x={x} y={-20} pointerEvents="none">{degree}</text>}
					<use xlinkHref="#rotator" {...rotator} />
			</Overlay.WhenMousePressedMove>
		)
	}
}
