import React, {Component, Fragment} from "react"

export default class Movable extends Component{
	state={move:false}
	changing={}
	render(){
		const {move}=this.state
		const {changing}=this
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
		this.setState({x:e.clientX, y:e.clientY})
		e.stopPropagation()
    }
	
	shouldComponentUpdate({onMove},{move,x0,x, y0, y}){
		if(move && onMove){
			this.changing=onMove(x-x0,y-y0)
		}
		return this.props!=arguments[0] || this.state!=arguments[1]
	}
}

const Overlay=({cursor,...props})=><div {...props} style={{position:"fixed", zIndex:Number.MAX_SAFE_INTEGER, left:0, top:0, width:"100%",height:"100%",cursor:cursor||"default"}}/>