import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import Top from "./top"
import Overlay from "./overlay"

export default class Movable extends Component{
	static propTypes={
		positioning: PropTypes.object,
		onMove: PropTypes.func
	}

	state={moving:false}
	render(){
		const {moving}=this.state
		const {children,showMovingPlaceholder}=this.props

		return (
			<Fragment>
				{ !moving ? null :
					 (<Overlay cursor="default"
					 	onMouseUp={e=>this.onEndMove(e)}
						onMouseMove={e=>this.moving(e)}
						>
						<Mover ref={a=>this.mover=a} cursor="default" show={showMovingPlaceholder}/>
					</Overlay>)
				}
				{React.cloneElement(children,{onMouseMove:e=>{
					if(e.buttons&0x1){
						e.stopPropagation()
						this.setState({moving:true})
					}
				}})}
			</Fragment>
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
			const pos=this.props.positioning.around(clientX,clientY)||{}
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
		const {show}=this.props
		const {x,y,id}=this.state
		return (
            <Top x={x} y={y}>
				{ show&& x!=undefined && y!=undefined && (
					<rect x={5} y={20} width={10} height={5}
						fill="transparent"
						stroke={"gray"}
						strokeWidth="1"/>
				)}
                {show && id && <rect width={2} height={20} fill={"black"}/>}
            </Top>
        )
	}
}
