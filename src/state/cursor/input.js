import React, {PureComponent as Component, PropTypes} from "react"
import Waypoint from "react-waypoint"

import Listener from "./listener"

export default class Input extends Component{
	state={top:0,left:0,height:0,inView:true}
	render(){
		const {top,left,height,color,fonts,size,up,down,inView}=this.state
		let style={height,margin:0,padding:0,border:0,left:0,top:0,position:"absolute",outline:"none"}
		if(!inView){
			style.position="fixed"
			style.height=1
		}

		return (
			<Waypoint fireOnRapidScroll={false}
				onEnter={e=>this.setState({inView:true})}
				onLeave={e=>this.setState({inView:false})}
				>
				<div unselectable="on"
					style={{left,top:top,position:"absolute",height:0,width:0}}>
					<Listener ref={a=>this.listener=a} up={up} down={down}
						style={{
							...style,
							color,
							fontSize:size,
							fontFamily:fonts,
							width:2,
							background:"transparent"
						}}/>
				</div>
			</Waypoint>
		)
	}
}
