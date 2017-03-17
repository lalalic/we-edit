import React, {Component, PropTypes} from "react"

export class Cursor extends Component{
	static propTypes={
		left: PropTypes.number, 
		top: PropTypes.number, 
		height: PropTypes.number, 
		color: PropTypes.string, 
		size: PropTypes.number
	}
	
	static defaultProps={
		left:0, 
		top:0, 
		height:20, 
		color:"black", 
		size:1
	}
	
	timer=null
	render(){
		const {left, top, height, color, size}=this.props
		return (
			<div style={{background:color,left:10,top:10,position:"absolute",height:20,width:size}}/>
		)
		return (
			<line
				x1={left}
				y1={top}
				x2={left}
				y2={top+height}
				strokeWidth={size}
				stroke={color}
				ref={node=>{
					if(this.timer){
						clearInterval(this.timer)
						delete this.timer
					}
					if(height){
						this.timer=setInterval(a=>{
							let y1=node.getAttribute('y1'), y2=node.getAttribute('y2')
							node.setAttribute('y2',y1==y2 ? top+height : top)
						}, 700)
					}
				}}
				/>
		)
	}
	
	componentWillUnmount(){
		if(this.timer){
			clearInterval(this.timer)
			delete this.timer
		}
	}
}
