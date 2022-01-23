import React, {Component, Fragment} from "react"
import ReactDOM from "react-dom"


const shrink=o=>Object.keys(o).reduce((a,k)=>{
	if(o[k]===undefined)
		delete o[k]
	return o
},o)
export default class Movable extends Component{
	constructor(){
		super(...arguments)
		this.state={move:false}
	}

	render(){
		const {move, x0,y0,x,y,...changing}=this.state
		let {children, cursor, color}=this.props
		
		let overlay=null
		if(move){
			overlay=<Overlay color={color} onMouseUp={e=>this.onEndMove(e)} onMouseMove={e=>this.move(e)} cursor={cursor}/>
			children=React.cloneElement(children, {...shrink(changing), onMouseUp:e=>this.onEndMove(e)})
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
		const x=e.clientX,y=e.clientY
        this.setState({move:true,x0:x, y0:y,x,y})
		e.stopPropagation()
    }

    onEndMove(e){
        const {x0,y0,x,y}=this.state
		const reset=Object.keys(this.state).reduce((o,k)=>(o[k]=undefined,o),{move:false})
		this.setState(reset,()=>this.props.onAccept?.(x-x0, y-y0))
		e.stopPropagation()
    }

    move(e){
		const {clientX:x,clientY:y}=e
		this.setState(state=>({x,y,...this.props.onMove?.(x-state.x0,y-state.y0,{state,x,y})}))
		e.stopPropagation()
    }
}

const Overlay=({cursor,color="transparent", ...props})=>ReactDOM.createPortal(
	<div {...props} style={{position:"fixed", /* background:color, opacity:0.5, */zIndex:Number.MAX_SAFE_INTEGER, left:0, top:0, width:"100%",height:"100%",cursor:cursor||"default"}}/>,
	document.body)