import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"

import Listener from "./listener"

export default class Input extends Component{
	render(){
		const {top,left,height,color,fontFamily,fontSize,...props}=this.props
		let style={height,margin:0,padding:0,border:0,left:10,top:10,position:"fixed",outline:"none"}
		return (
			<div unselectable="on"
					style={{left,top,position:"fixed",height:0,width:0}}>
				<Listener
					style={{
						...style,
						color,
						fontSize,
						fontFamily,
						width:2,
						background:"transparent"
					}}
					{...props}
					/>
			</div>
		)
	}
}
