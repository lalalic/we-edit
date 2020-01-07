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
						onRotate(e)
						e.stopPropagation()
					}}
					/>
			</Fragment>
		)
	}
}
