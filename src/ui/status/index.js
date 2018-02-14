import React from "react"
import {Toolbar, ToolbarGroup, FlatButton, Slider} from "material-ui"

const ButtonStyle={
	background:"transparent",
	color:"white",
	fontSize: 8,
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
			<Scale/>
		</Toolbar>
	</div>
)

const Page=({current=1,total=20})=>(<FlatButton style={ButtonStyle}>PAGE {current} OF {total}</FlatButton>)

const Words=({total=120})=>(<FlatButton style={ButtonStyle}>{total} WORDS</FlatButton>)

const Scale=()=>(
	<div style={{width:400,display:"inline-block"}}>
		<div style={{width:300,display:"inline-block"}}>
			<Slider 
				sliderStyle={{marginTop:6}} 
				step={5} 
				value={100} min={20} max={200}/>
		</div>
	</div>
)

export default Status