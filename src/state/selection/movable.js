import React, {Component, PropTypes} from "react"

import Overlay from "./overlay"

export default class Movable extends Component{
	static contextTypes={
        positionFromPoint: PropTypes.func
    }
	
	static propTypes={
		onMove: PropTypes.func.isRequired
	}

	state={move:false}
	render(){
		const {move}=this.state
		const {children}=this.props
		
		if(move){
			return (
				<g>
					{children}
					 <Overlay cursor="default"
						onMouseUp={e=>this.onEndMove(e)}
						onMouseMove={e=>this.move(e)}
						>
						<Mover ref={a=>this.mover=a} cursor="default"/>
					</Overlay>
				</g>
			)
		}else{
			return (
				<g>
					{React.cloneElement(children,{onMouseDown:this.onStartMove.bind(this)})}
				</g>
			)
		}
	}
	
	onStartMove(e){
        this.setState({move:true})
		e.stopPropagation()
    }

    onEndMove(e){
        let {id,at}=this.mover.state
        this.setState({move:undefined},()=>{
            if(id)
                this.props.onMove(id,at)
        })
		e.stopPropagation()
    }

    move(e){
		let x=e.clientX, y=e.clientY
        let pos=this.context.positionFromPoint(x,y)
		if(!pos)
			pos={id:undefined,left:x, top:y}

		this.mover.setState(pos)
		e.stopPropagation()
    }
}

class Mover extends Component{
    state={}
    render(){
        const {left:x,top:y, id}=this.state
        let caret=null, placeholder=null
        if(id)
            caret=<rect x={x} y={y} width={2} height={20} fill="black"/>

		if(x!=undefined && y!=undefined)
			placeholder=<rect x={x+5} y={y+20} width={10} height={5} 
					fill="transparent" 
					stroke="gray" 
					strokeWidth="1"/>
        return (
            <g>
				{placeholder}
                {caret}
            </g>
        )
    }
}
