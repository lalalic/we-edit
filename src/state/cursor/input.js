import React, {PureComponent as Component, PropTypes} from "react"
import Listener from "./listener"

export default class Input extends Component{
	state={top:0,left:0,height:0}
	render(){
		const {top,left,height}=this.state
		const style={margin:0,padding:0,border:0,position:"absolute"}
		return (
			<div unselectable="on"
				style={{...style,left,top:top-height,position:"absolute",height:0.1,width:0.1}}>
				<Listener ref={a=>this.listener=a}
					style={{
						...style,
						height:height,
						width:2,
						background:"blue",
						color:"transparent"
					}}/>
			</div>
		)
	}

	componentDidUpdate(){
		this.listener.focus()
	}
}
