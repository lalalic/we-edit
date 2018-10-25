import React, {Component} from "react"
import PropTypes from "prop-types"


import Overlay from "./overlay"
import {Group} from "../../composed"

export default class Movable extends Component{
	static contextTypes={
        query: PropTypes.func
    }

	static propTypes={
		onMove: PropTypes.func.isRequired
	}

	state={move:false}
	render(){
		const {move}=this.state
		const {children}=this.props

		return (
			<Group>
				{ !move ? null :
					 (<Overlay cursor="default"
					 	onMouseUp={e=>this.onEndMove(e)}
						onMouseMove={e=>this.move(e)}
						>
						<Mover ref={a=>this.mover=a} cursor="default"/>
					</Overlay>)
				}
				{React.cloneElement(children,{onMouseDown:this.onStartMove.bind(this)})}
			</Group>
		)
	}

	onStartMove(e){
        this.setState({move:true})
		e.stopPropagation()
    }

    onEndMove(e){
		if(this.state.move){
	        let {id,at}=this.mover.state
	        this.setState({move:false},()=>{
	            if(id)
	                this.props.onMove(id,at)
	        })
			e.stopPropagation()
		}
    }

    move(e){
		const {target,clientX:left, clientY:top}=e
		let pos=this.props.around(target,left,top)
		if(pos){
			this.mover.setState(pos)
		}
		e.stopPropagation()
    }
}

class Mover extends Component{
    state={}
    render(){
        const {x,y, id}=this.state
        let caret=null, placeholder=null
        if(id)
            caret=<rect x={x} y={y} width={2} height={20} fill="black"/>

		if(x!=undefined && y!=undefined)
			placeholder=<rect x={x+5} y={y+20} width={10} height={5}
					fill="transparent"
					stroke="gray"
					strokeWidth="1"/>
        return (
            <Group>
				{placeholder}
                {caret}
            </Group>
        )
    }
}
