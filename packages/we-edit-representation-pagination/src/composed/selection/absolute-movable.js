import React, {Component} from "react"
import PropTypes from "prop-types"

import {Group} from "../../composed"
import Overlay from "./overlay"

export default class AbsoluteMovable extends Component{
	static propTypes={
		onMove: PropTypes.func.isRequired,
	}
	state={}
	onStartMove=this.onStartMove.bind(this)

	render(){
		const {moving,cursor}=this.state
		const {children}=this.props
		if(moving){
			return (
				<Overlay
					onMouseUp={e=>{
						this.setState({moving:undefined})
						e.stopPropagation()
					}}
					onMouseMove={e=>{
						this.move(e.clientX, e.clientY)
						e.stopPropagation()
					}}
					style={{cursor}}
					>
					{children}
				</Overlay>
			)
		}else{
			return React.cloneElement(children,{onMouseDown:this.onStartMove})
		}
	}
	onStartMove(e){
		this.setState({moving:true})
	}

	move(left,top){
        const {onMove}=this.props
        onMove({dest:{left,top}})
	}
}
