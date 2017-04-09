import React, {PureComponent as Component, PropTypes} from "react"
import Listener from "./listener"

export default class Input extends Component{
	state={top:0,left:0,height:0}
	render(){
		const {top,left,height,color,fonts,size,up,down}=this.state
		const style={margin:0,padding:0,border:0,position:"absolute",outline:"none"}
		return (
			<div unselectable="on"
				style={{...style,left,top:top,position:"absolute",height:0,width:0}}>
				<Listener ref={a=>this.listener=a} up={up} down={down}
					style={{
						...style,
						color,
						fontSize:size,
						fontFamily:fonts,
						height,
						width:2,
						background:"transparent"
					}}/>
			</div>
		)
	}

	componentDidUpdate(){
		this.listener.focus()
	}
}
