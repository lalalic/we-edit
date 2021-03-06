import React, {Component} from "react"
import {whenSelectionChange} from "../../state"
import Listener from "./listener"

export default whenSelectionChange()(class Input extends Component{
	render(){
		const {selection,hasCursorShape,...props}=this.props
		const {position:{top,left,height,color,fontFamily,fontSize,},isCursor, isFocusable}=selection||{position:{}}
		const ignoreEvent=e=>e.stopPropagation()
		return (
			<div unselectable="on" 
				style={{left,top,position:"fixed",height:0,width:0}}
				onMouseDown={ignoreEvent}
				onMouseMove={ignoreEvent}
				onMouseUp={ignoreEvent}
				>
				<Listener
					style={{
						margin:0,padding:0,border:0,left:0,top:0,
						position:"absolute",outline:"none",width:2,background:"transparent",
						fontSize,
						fontFamily,
						height: !hasCursorShape && isCursor&&!isFocusable ? height : 1,
						color: !hasCursorShape && isCursor&&!isFocusable ? color : "transparent",
					}}
					{...props}
					/>
			</div>
		)
	}
})
