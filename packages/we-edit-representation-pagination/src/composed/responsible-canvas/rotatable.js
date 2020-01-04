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
			return (<use xlinkHref="#rotator" {...rotator} onMouseDown={e=>this.onStartRotate(e)}/>)
		
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

	onStartRotate({clientX:left,clientY:top}){
		this.setState({rotating:true})
		this.xy=this.context.asCanvasPoint({left,top})
	}

	rotate({clientX:left,clientY:top}){
		const {props:{onRotate,x=0,y=0, degree},context:{asCanvasPoint}}=this
		const xy=asCanvasPoint({left,top})
		//const dx=(xy.x-this.xy.x)/Math.cos(degree), dy=(this.xy.y-xy.y)/Math.cos(degree)
		const dd=parseInt(Math.atan2(xy.x-this.xy.x,this.xy.y-xy.y)*180/Math.PI)
		if(false!=onRotate({degree:(degree+dd+360)%360})){
			this.xy=xy
		}
	}
}
