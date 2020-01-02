import React, {Component} from "react"
import PropTypes from "prop-types"

import Top from "./top"
import Overlay from "./overlay"
import {Group} from "../../../composed"

export default class Movable extends Component{
	static propTypes={
		onMove: PropTypes.func.isRequired,
		onMoving: PropTypes.func,
	}

	state={moving:false}
	render(){
		const {moving}=this.state
		const {children}=this.props

		return (
			<Group>
				{ !moving ? null :
					 (<Overlay cursor="default"
					 	onMouseUp={e=>this.onEndMove(e)}
						onMouseMove={e=>this.moving(e)}
						>
						<Mover ref={a=>this.mover=a} cursor="default" show={!this.props.isWholeAnchor}/>
					</Overlay>)
				}
				{React.cloneElement(children,{onMouseMove:e=>{
					if(e.buttons&0x1){
						e.stopPropagation()
						this.setState({moving:true})
					}
				}})}
			</Group>
		)
	}

    onEndMove(e){
		if(!this.state.moving)
			return

		const dest=this.mover.state
		this.setState({moving:false},()=>{
			if(dest.id){
				this.props.onMove({dest})
			}
		})
		e.stopPropagation()

    }

    moving(e){
		if(this.state.moving){
			const {clientX, clientY}=e
			const pos=this.props.around(clientX,clientY)||{}
			this.mover.setState(({clientX:x=clientX,clientY:y=clientY,...state})=>{
				return {...state, ...pos, clientX, clientY, dx:clientX-x, dy:clientY-y}
			},()=>{
				this.props.onMove({dest:this.mover.state,moving:true})
			})
		}
		e.stopPropagation()
    }
}

class Mover extends Component{
	state={}
    render(){
		const {x,y,id}=this.state
		return (
            <Top x={x} y={y}>
				{ x!=undefined && y!=undefined && (
					<rect x={5} y={20} width={10} height={5}
						fill="transparent"
						stroke={this.props.show ? "gray" : "transparent"}
						strokeWidth="1"/>
				)}
                {id && <rect width={2} height={20} fill={this.props.show ? "black" : "transparent"}/>}
            </Top>
        )
	}
}
