import React, {PureComponent as Component, PropTypes} from "react"
import Listener from "./listener"

export default class Input extends Component{
	state={top:0,left:0}
	render(){
		const {top,left}=this.state
		const style={margin:0,padding:0,border:0,position:"absolute"}
		return (
			<div unselectable="on"
				style={{...style,left,top,position:"absolute",height:0.1,width:0.1}}>
				<Listener ref={a=>this.listener=a}
					style={{
						...style,
						height:0.1,
						width:0.1,
						background:"transparent",
						color:"transparent"
					}}/>
			</div>
		)
	}

	componentDidUpdate(){
		this.listener.focus()
	}
}
