import React, {Component, Fragment} from "react"
import ReactDOM from "react-dom"

export default class Movable extends Component{
	static RodX=({left, height=window.screen.height})=>(
		<svg style={{position:"absolute", width:2, height,left, top: 20}}>
			<line {...{x1:1,x2:1,y1:0,y2:height}} strokeWidth={1} strokeDasharray={[2,1]} stroke="gray"/>
		</svg>
	)

	static RodY=({top,width=window.screen.width})=>(
		<svg style={{position:"absolute", width, height:2,top, left: 20}}>
			<line {...{y1:1,y2:1,x1:0,x2:width}} strokeWidth={1} strokeDasharray={[2,1]} stroke="gray"/>
		</svg>
	)
	constructor(){
		super(...arguments)
		this.state={move:false}
	}

	render(){
		const {move, x0,y0,x,y, style:style0, ...changing}=this.state
		let {children, cursor, color, style: style1}=this.props
		
		const style={...children.props.style,...style1,...style0,}
		if(move){
			const {rodX=0, rod=<this.constructor.RodX left={style.left-1+rodX}/>}=this.props
			return (
				<Fragment>
					<Overlay color={color} onMouseUp={e=>this.onEndMove(e)} onMouseMove={e=>this.move(e)} cursor={cursor}/>
					{React.cloneElement(children, {
						onMouseUp:e=>this.onEndMove(e),
						style,
						...changing,
					})}
					{rod}
				</Fragment>
			)
		}else{
			return React.cloneElement(children, {
				onMouseDown:e=>this.onStartMove(e),
				style,
				...changing,
			})
		}
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
	<div {...props} style={{position:"fixed", /*background:color, opacity:0.5, */ zIndex:Number.MAX_SAFE_INTEGER, left:0, top:0, width:"100%",height:"100%",cursor:cursor||"default"}}/>,
	document.body)