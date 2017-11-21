import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"

import Listener from "./listener"

export default class Input extends Component{
	state={top:0,left:0,height:0}
	isInView(left,top){
		let {scrollX,scrollY,screen:{height,width}}=window
		return scrollY<top<scrollY+height && scrollX<left<scrollX+width
	}

	render(){
		const {top,left,height,color,fontFamily,fontSize,up,down}=this.state
		let style={height,margin:0,padding:0,border:0,left:0,top:0,position:"absolute",outline:"none"}
		if(!this.isInView(left,top)){
			style.position="fixed"
			style.height=1
		}

		return (
			<Waypoint fireOnRapidScroll={false}
				onEnter={e=>this.forceUpdate()}
				onLeave={e=>this.forceUpdate()}
				>
				<div unselectable="on"
					style={{left,top:top,position:"absolute",height:0,width:0}}>
					<Listener up={up} down={down}
						style={{
							...style,
							color,
							fontSize,
							fontFamily,
							width:2,
							background:"transparent"
						}}/>
				</div>
			</Waypoint>
		)
	}
}
