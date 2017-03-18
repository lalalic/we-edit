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
		const style={margin:0,padding:0,border:0}
		return (
			<input unselectable="on"
				style={{...style,background:color,left,top,position:"absolute",height:20,width:size}}
				ref={node=>{
					if(this.timer){
						clearInterval(this.timer)
						delete this.timer
					}
					if(height){
						this.timer=setInterval(a=>{
							if(node.style.backgroundColor=="transparent"){
								node.style.backgroundColor=color
							}else{
								node.style.backgroundColor="transparent"
							}
						}, 700)
					}
				}}/>
		)
	}

	componentWillUnmount(){
		if(this.timer){
			clearInterval(this.timer)
			delete this.timer
		}
	}
}
