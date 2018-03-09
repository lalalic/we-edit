import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, mapProps,withProps} from "recompose"
import {Toolbar, ToolbarGroup, FlatButton, IconButton, Slider} from "material-ui"
import * as selector from "we-edit/state/selector"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"
import IconWeb from "material-ui/svg-icons/av/web"
import {blue800, blue900} from "material-ui/styles/colors"

const ButtonStyle={
	background:"transparent",
	color:"white",
	fontSize: 8,
}

const RootStyle={
	backgroundColor:blue800,
	color:"white",
	width:"100%",
	display:"flex",
	flexDirection:"row"
}

const CompactButtonStyle={
	...ButtonStyle,
	minWidth:"auto",
}


const Status=compose(
	getContext({
		selection:PropTypes.object,
		muiTheme: PropTypes.object,
	}),
	mapProps(({selection,muiTheme})=>{
		const {page}=selection.props("page")
		return {
			page,
			height:muiTheme.button.height
		}
	}),
	connect(state=>({stat:selector.getStatistics(state)}))
)(({page,stat, height})=>(
	<div style={{...RootStyle,height}}>
		<Page current={page+1} total={stat.pages}/>
		<Words total={stat.words}/>
		<div style={{flex:"1 100%"}}/>
		<Mode height={height}/>
		<Scale/>
	</div>
))

const Page=({current=1,total=20})=>(
	<FlatButton style={ButtonStyle}>
		PAGE {current} OF {total}
	</FlatButton>
)

const Words=({total=120})=>(
	<FlatButton style={ButtonStyle}>
		{total} WORDS
	</FlatButton>
)

const Scale=({percent=100,decrease=console.log,increase=console.log})=>(
	<div style={{display:"flex"}}>
		<FlatButton label="-" onClick={decrease} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:20, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<Slider style={{width:100, display:"inline-block"}}
			sliderStyle={{top:-13}} 
			step={5} 
			value={100} min={20} max={200}
			/>
		<FlatButton label="+" onClick={increase} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:18, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<FlatButton label={`${percent}%`} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:ButtonStyle.fontSize}}
			/>
	</div>
)

const Mode=({current, height, style={height,width:height,padding:6},iconStyle={height:18,width:18}})=>(
	<div style={{display:"flex", opacity:0.4}}>
		<IconButton 
			style={style}
			iconStyle={iconStyle}
			tooltip="read mode">
			<IconRead/>
		</IconButton>
		
		<IconButton 
			style={{...style,background:blue900}}
			iconStyle={iconStyle}
			tooltip="print mode">
			<IconPrint/>
		</IconButton>
		
		<IconButton 
			style={style}
			iconStyle={iconStyle}
			tooltip="web mode">
			<IconWeb/>
		</IconButton>
	</div>
)

export default Status