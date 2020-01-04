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
		const {props:{onRotate,x=0,y=0,id,positioning,degree}}=this
		const xy=positioning.asCanvasPoint({left,top})
		const pos=positioning.position(id,0)
		const dy=(pos.y+y)-xy.y, dx=xy.x-(x+pos.x)
		const c=90-parseInt(Math.atan2(dy,dx)*180/Math.PI)
		const rotate=(c+360)%360
		console.log(`c=${c},dx=${dx},dy=${dy}, rotate:${rotate}, degree:${degree}`)
		if(false!=onRotate({degree:rotate})){
			this.xy=xy
		}
	}
}
