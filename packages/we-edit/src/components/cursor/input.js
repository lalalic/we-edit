import React, {Component} from "react"
import {whenSelectionChange} from "../../state"
import Listener from "./listener"

export default whenSelectionChange()(class Input extends Component{
	render(){
		const {selection,hasCursorShape,...props}=this.props
		const {position:{top,left,height,color,fontFamily,fontSize,},isCursor}=selection||{position:{}}
		return (
			<div unselectable="on" style={{left,top,position:"fixed",height:0,width:0}}>
				<Listener
					style={{
						margin:0,padding:0,border:0,left:0,top:0,
						position:"absolute",outline:"none",width:2,background:"transparent",
						fontSize,
						fontFamily,
						height: !hasCursorShape && isCursor ? height : 1,
						color: !hasCursorShape && isCursor ? color : "transparent",
					}}
					{...props}
					/>
			</div>
		)
	}
})
