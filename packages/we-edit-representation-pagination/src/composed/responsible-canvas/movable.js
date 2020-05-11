import React, {Component} from "react"
import PropTypes from "prop-types"

import Overlay from "./overlay"
import Group from "../group"

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

	state={moving:false}
	render(){
		const {
			state:{moving, x, y, id, at}, 
			props:{children, isAnchor, onStart, onMove,onEnd=onMove}, 
			context:{positioning}}=this

		return (
			<Overlay.WhenMousePressedMove
				style={{cursor:"default"}}
				onStart={e=>{
					const {x,y}=positioning.asCanvasPoint({left:e.clientX,top:e.clientY})
					this.setState({moving:true,x,y,x0:x,y0:y})
					onStart && onStart({x,y})
				}}

				onMouseUp={e=>{
					e.stopPropagation()
					this.setState({moving:false})
					if(isAnchor){
						const {clientX:left, clientY:top}=e
						const dest=positioning.asCanvasPoint({left, top})
						onEnd && onEnd({dest:{dx:dest.x-x, dy:dest.y-y}});
					}else{
						onEnd && onEnd({dest:{id,at,x,y}})
					}
				}}

				onMouseMove={e=>{
					e.stopPropagation()
					const {clientX:left, clientY:top}=e
					if(isAnchor){
						const dest=positioning.asCanvasPoint({left, top})
						this.setState({...dest},()=>{
							onMove({dest:{dx:dest.x-x, dy:dest.y-y}})
						})
					}else{
						const {id,at}=positioning.around(left,top)
						if(id){
							const {x,y}=positioning.position(id,at)
							this.setState({x,y,id,at})
						}
					}
				}}
				>
				{children}
				{moving && !isAnchor && <MovingPlaceholder {...{x,y}}/>}
			</Overlay.WhenMousePressedMove>
		)
	}
}

const MovingPlaceholder=({x=0,y=0})=>(
	<Group  x={x} y={y}>
		<rect x={5} y={20} width={10} height={5}  pointerEvents="none"
				fill="transparent"
				stroke={"gray"}
				strokeWidth="1"/>
		<rect width={2} height={20} fill={"black"}  pointerEvents="none"/>
	</Group>
)
