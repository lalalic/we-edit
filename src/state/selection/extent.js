import React, {Component, PropTypes} from "react"
import Spot from "./spot"
import Overlay from "./overlay"
import Mover from "./mover"

export class Extent extends Component{
	static propTypes={
		onResize: PropTypes.func,
		onMove: PropTypes.func
	}

	static contextTypes={
        positionFromPoint: PropTypes.func
    }


	state={}

	render(){
		const {path, spots, onResize, onMove}=this.props
		const {resize,move}=this.state
		let overlay=null

		if(resize){
			overlay=<Overlay cursor="crosshair" key="overlay"
				onMouseUp={e=>this.setState({resize:undefined})}
				onMouseMove={e=>this.resize(e.clientX, e.clientY)}
				/>
		}else if(move){
			overlay=(
				<Overlay cursor="default"
					onMouseUp={e=>this.onEndMove()}
					onMouseMove={e=>this.move(e.clientX, e.clientY)}
					>
					<Mover ref={a=>this.mover=a} cursor="default"/>
				</Overlay>
			)
		}
		return (
			<g>
				<path d={path} fill="white" fillOpacity={0.01} cursor="move" onMouseDown={e=>this.onStartMove(e)}/>
				{
					spots.map((a,i)=><Spot key={i} {...a} onStartResize={(resize,e)=>this.onStartResize(resize,e)}/>)
				}

				{overlay}
			</g>
		)
	}

	onStartResize(resize,e){
		this.setState({resize})
		this.left=e.clientX
		this.top=e.clientY
	}

	resize(left,top){
		const {onResize}=this.props
		const {resize}=this.state
		let x=left-this.left
		let y=top-this.top
		switch(resize){
		case "-ns":
			y*=-1
		case "ns":
			y && onResize({y:-y})
		break
		case "-ew":
			x*=-1
		case "ew":
			x && onResize({x})
		break

		case "-nwse":
			x*=-1
		case "nwse":
			x && y && onResize({x:-x,y})
		break

		case "-nesw":
			x*=-1
		case "nesw":
			x && y && onResize({x,y})
		break
		}
		this.left=left
		this.top=top
	}

	onStartMove(e){
		this.setState({move:true})
	}

	move(x,y){
		let pos=this.context.positionFromPoint(x,y)
		if(!pos)
			pos={id:undefined,left:x, top:y}

		this.mover.setState(pos)
	}

	onEndMove(){
		let {id,at}=this.mover.state
		this.setState({move:undefined},e=>{
			if(id)
				this.props.onMove({id,at})
		})
	}
}

export default Extent
