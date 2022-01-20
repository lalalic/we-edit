import React, {Component, Fragment} from "react"

export default class Movable extends Component{
	state={move:false}
	render(){
		const {move, x0,y0,x,y,...changing}=this.state
		let {children, cursor}=this.props
		
		let overlay=null
		if(move){
			overlay=<Overlay onMouseUp={e=>this.onEndMove(e)} onMouseMove={e=>this.move(e)} cursor={cursor}/>
			children=React.cloneElement(children, {...changing, onMouseUp:e=>this.onEndMove(e)})
		}else{
			children=React.cloneElement(children, {
				onMouseDown:e=>this.onStartMove(e),
			})
		}
		return (
			<Fragment>
				{overlay}
				{children}
			</Fragment>
		)
	}
	
	onStartMove(e){
		let x=e.clientX,y=e.clientY
        this.setState({move:true,x0:x, y0:y,x,y})
		e.stopPropagation()
    }

    onEndMove(e){
        let {x0,y0,x,y}=this.state
        this.setState({move:false},a=>{
			this.props.onAccept && this.props.onAccept(x-x0, y-y0)
        })
		e.stopPropagation()
    }

    move(e){
		const {onMove=a=>({})}=this.props
		const {clientX:x,clientY:y}=e
		this.setState(state=>({x,y,...onMove(x-state.x0,y-state.y0,{state,x,y})}))
		e.stopPropagation()
    }
}

const Overlay=({cursor,...props})=><div {...props} style={{position:"fixed", zIndex:Number.MAX_SAFE_INTEGER, left:0, top:0, width:"100%",height:"100%",cursor:cursor||"default"}}/>