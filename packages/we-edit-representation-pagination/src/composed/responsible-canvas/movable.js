import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import Top from "./top"
import Overlay from "./overlay"
import Group from "../group"

/**
 * 1. anchor move: move to arbitary x,y, which can be composing during moving, without placeholder
 * 2. flow move: move to a flowable position, which can use placeholder to identify the dest
 */
export default class Movable extends Component{
	static propTypes={
		around: PropTypes.func,
		onMove: PropTypes.func,
		isAnchor: PropTypes.bool,
	}

	static contextTypes={
		positioning: PropTypes.object
	}

	state={moving:false}
	render(){
		const {moving, x, y}=this.state
		const {children, isAnchor}=this.props
		if(!moving){
			return React.cloneElement(children,{
				onMouseDown:e=>{
					if(e.buttons&0x1){
						e.stopPropagation()
						const {x,y}=this.context.positioning.asCanvasPoint({left:e.clientX,top:e.clientY})
						this.setState({moving:true,x,y})
					}
				}
			})
		}

		return (
			<Fragment>
				{children}
				<Overlay cursor="default"
					onMouseUp={e=>this.onEndMove(e)}
					onMouseMove={e=>this.moving(e)}
					>
					{!isAnchor && <MovingPlaceholder {...{x,y}}/>}
				</Overlay>
			</Fragment>
		)
			
	}

    onEndMove(e){
		if(!this.state.moving)
			return
		const {clientX:left, clientY:top}=e
		this.setState({moving:false},()=>{
			const {props:{isAnchor,onMove}, state:{x,y}}=this
			if(isAnchor){
				const dest=this.context.positioning.asCanvasPoint({left, top})
				onMove({dest:{dx:dest.x-x, dy:dest.y-y}})
			}else{
				onMove({dest:this.context.positioning.around(left,top)})
			}
		})
		e.stopPropagation()
    }

    moving(e){
		const {state:{moving,x,y},props:{onMove,isAnchor}}=this
		if(moving){
			const {clientX:left, clientY:top}=e
			if(isAnchor){
				const dest=this.context.positioning.asCanvasPoint({left, top})
				this.setState({...dest},()=>{
					onMove({dest:{dx:dest.x-x, dy:dest.y-y}})
				})
			}else{
				const {id,at}=this.context.positioning.around(left,top)
				if(id){
					const {x,y}=this.context.positioning.position(id,at)
					this.setState({x,y,id,at})
				}
			}
		}
		e.stopPropagation()
    }
}

const MovingPlaceholder=({x=0,y=0})=>(
	<Top>
		<Group  x={x} y={y}>
			<rect x={5} y={20} width={10} height={5}
					fill="transparent"
					stroke={"gray"}
					strokeWidth="1"/>
			<rect width={2} height={20} fill={"black"}/>
		</Group>
	</Top>
)
