import React, {Component,Fragment} from "react"
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
		asCanvasPoint: PropTypes.func
	}

	state={rotating:false}

	render(){
		const {props:{r=12,x,y,onEnd, degree=0},state:{rotating}}=this
		const rotator={
			width:2*r,height:2*r,x:x-r,y:-(20+r),
			style:{fill:"white",stroke:"lightgray",strokeWidth:1},
		}
		
		if(!rotating)
			return (<use xlinkHref="#rotator" {...rotator} onMouseDown={e=>this.setState({rotating:true})}/>)
		
		return (
			<Fragment>
				<g ref="locator">
					<text x={x+r} y={-20}>{degree}</text>
					<use xlinkHref="#rotator" {...rotator}/>
				</g>
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
					/>
			</Fragment>
		)
	}

	rotate({clientX:left,clientY:top}){
		const {props:{onRotate,x=0,y=0,id,positioning}}=this
		const xy=positioning.asCanvasPoint({left,top})
		const pos=positioning.position(id,0)
		const center={x:x+pos.x,y:y+pos.y}
		const degree=parseInt(Math.atan2(xy.x-center.x,-xy.y+center.y)*180/Math.PI)
		onRotate({degree: degree<0 ? degree+360 : degree})
	}
}
