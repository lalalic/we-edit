import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, mapProps,withProps,setDisplayName} from "recompose"
import {Toolbar, ToolbarGroup, FlatButton, IconButton, Slider} from "material-ui"
import * as selector from "we-edit/state/selector"
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
	setDisplayName("StatusBar"),
	getContext({
		selection:PropTypes.object,
		muiTheme: PropTypes.object,
	}),
	mapProps(({selection,muiTheme,layout})=>{
		const {page}=selection.props("page")
		return {
			layout,
			page,
			height:muiTheme.button.height
		}
	})
)(({page,words, scale, height, layout})=>(
	<div style={{...RootStyle,height}}>
		<Page {...page}/>
		<Words total={words}/>
		<div style={{flex:"1 100%"}}/>
		{layout.items.length<2 ? null : <Layout height={height} {...layout}/>}
		<Scale {...scale}/>
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

const Scale=({current,max,min,decrease=console.log,increase=console.log})=>(
	<div style={{display:"flex"}}>
		<FlatButton label="-" onClick={decrease} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:20, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<Slider style={{width:100, display:"inline-block"}}
			sliderStyle={{top:-13}} 
			step={5} 
			value={current} min={min} max={max}
			/>
		<FlatButton label="+" onClick={increase} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:18, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<FlatButton label={`${current}%`} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:ButtonStyle.fontSize}}
			/>
	</div>
)

const Layout=({items, current, onChange, height,iconStyle={height:18,width:18}})=>(
	<div style={{display:"flex", opacity:0.4}}>
		{items.map(({layout, icon, style={height,width:height,padding:6}})=>{
			if(layout==current){
				style.background=blue900
			}
			
			return (
				<IconButton key={layout}
					style={style}
					iconStyle={iconStyle}
					tooltip={`${layout} mode`}
					tooltipPosition="top-center"
					onClick={()=>onChange(layout)}
					>
					{icon}
				</IconButton>
			)
		})}
	</div>
)

export default Status