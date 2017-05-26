import React, {Component, PropTypes} from "react"
import Spot from "./spot"

export class Extent extends Component{
	static propTypes={
		onResize: PropTypes.func,
		onMove: PropTypes.func
	}
	
	static contextTypes={
		docId: PropTypes.string
	}
	
	state={}
	
	render(){
		const {path, spots, onResize, onMove}=this.props
		const {resize}=this.state
		let overlay=null
		
		if(resize){
			let {docId}=this.context
			let svg=document.querySelector(`#${docId} svg`)
			let {width,height}=svg.viewBox.baseVal
			overlay=<rect x={0} y={0} 
				width={width} height={height} 
				fill="transparent" 
				cursor="crosshair"
				onMouseUp={e=>this.setState({resize:undefined})}
				onMouseMove={e=>{
					let x=e.clientX-this.left
					let y=e.clientY-this.top
					switch(resize){
					case "n":
						y && onResize({y})
					break
					case "e":
						x && onResize({x})
					break
					default:
						x && y && onResize({x,y})
					break
					}
					this.left=e.clientX
					this.top=e.clientY
				}}
				/>
		}
		return (
			<g>
				<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
				{
					spots.map((a,i)=><Spot key={i} {...a} onStartResize={this.onStartResize.bind(this)}/>)
				}
				
				{overlay}
			</g>
		)
	}
	
	onStartResize(resize,e){
		this.setState({resize},()=>{
			this.left=e.clientX
			this.top=e.clientY
		})
	}
	
	
	
	
	
	
}

export default Extent