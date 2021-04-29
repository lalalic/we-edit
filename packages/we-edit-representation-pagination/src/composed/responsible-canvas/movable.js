import React, {Component, PureComponent} from "react"
import PropTypes from "prop-types"

import Overlay from "./overlay"
import Group from "../group"

const MovingPlaceholder=({x=0,y=0},{precision=1})=>(
	<Group  x={x} y={y}>
		<rect x={5*precision} y={20*precision} width={10*precision} height={5*precision}  pointerEvents="none"
				fill="transparent"
				stroke={"gray"}
				strokeWidth={1*precision}/>
		<rect width={2*precision} height={20*precision} fill={"black"}  pointerEvents="none"/>
	</Group>
)
MovingPlaceholder.contextTypes={
	precision:PropTypes.number,
}

/**
 * 1. anchor move: move to arbitary x,y, which can be composing during moving, without placeholder
 * 2. flow move: move to a flowable position, which can use placeholder to identify the dest
 */
export default class Movable extends Component{
	static propTypes={
		onStart: PropTypes.func,
		onMove: PropTypes.func,
		onEnd: PropTypes.func,
		isAnchor: PropTypes.bool,
	}

	static contextTypes={
		positioning: PropTypes.object
	}

	static MovingPlaceholder=MovingPlaceholder

	state={moving:false}
	render(){
		const {
			state:{moving, x, y, x0,y0,id, at}, 
			props:{children, isAnchor, onStart, onMove,onEnd=onMove}, 
			context:{positioning},
			constructor:{MovingPlaceholder}
		}=this

		return (
			<Overlay.WhenMousePressedMove
				style={{cursor:"default"}}
				onStart={e=>{
					const {x,y}=e.motionPoint
					this.setState({moving:true,x,y,x0:x,y0:y})
					onStart && onStart({x,y})
				}}

				onMouseUp={e=>{
					e.stopPropagation()
					this.setState({moving:false,x:undefined,y:undefined,x0:undefined,y0:undefined})
					if(isAnchor){
						const dest=e.motionPoint
						onMove?.({dest:{dx:dest.x-x0, dy:dest.y-y0}})
						onEnd?.({dest:{dx:dest.x-x, dy:dest.y-y}});
					}else{
						onEnd?.({dest:{id,at,x:x0,y:y0}})
					}
				}}

				onMouseMove={e=>{
					e.stopPropagation()
					if(isAnchor){
						const dest=e.motionPoint
						this.setState({x0:dest.x,y0:dest.y})
						onMove?.({dest:{dx:dest.x-x0, dy:dest.y-y0}})
					}else{
						const {id,at}=positioning.around(e.clientX,e.clientY)
						if(id){
							const {x,y}=positioning.position({id,at})
							this.setState({id,at,x0:x,y0:y})
						}
					}
				}}
				>
				{children}
				{moving && !isAnchor && <MovingPlaceholder {...{x:x0,y:y0}}/>}
			</Overlay.WhenMousePressedMove>
		)
	}
}