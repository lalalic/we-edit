import React from "react"
import {Toolbar, ToolbarGroup, FlatButton} from "material-ui"

const ButtonStyle={
	background:"transparent",
	color:"white"
}

const RootStyle={
	position:"fixed",
	bottom:0,
	left:0,
	backgroundColor:"skyblue",
	color:"white",
	width:"100%",
	height:30,
}
const Status=({})=>(
	<div style={RootStyle}>
		<Toolbar style={ButtonStyle}>
			<Page/>
			<Words/>
		</Toolbar>
	</div>
)

const Page=({current=1,total=20})=>(<FlatButton style={ButtonStyle}>PAGE {current} OF {total}</FlatButton>)

const Words=({total=120})=>(<FlatButton style={ButtonStyle}>{total} WORDS</FlatButton>)

export default Status