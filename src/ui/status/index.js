import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, mapProps,withProps,setDisplayName} from "recompose"
import {Toolbar, ToolbarGroup, FlatButton, IconButton, Slider} from "material-ui"
import * as selector from "we-edit/state/selector"
import {blue800, blue900} from "material-ui/styles/colors"
import SizeIconButton from "we-edit-ui/components/size-icon-button"

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
	mapProps(({selection,muiTheme,layout,words,scale,pages, setScale})=>{
		const {page:current}=selection.props("page")
		return {
			layout,scale,words,
			page:{current,total:pages},
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

const Page=({current=0,total=20})=>(
	<FlatButton style={ButtonStyle}>
		PAGE {current+1} OF {total}
	</FlatButton>
)

const Words=({total=120})=>(
	<FlatButton style={ButtonStyle}>
		{total} WORDS
	</FlatButton>
)

const Scale=({
	current,max,min,step=10,
	onChange, 
	})=>(
	<div style={{display:"flex"}}>
		<FlatButton label="-" onClick={()=>onChange(Math.max(current-step,min))} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:20, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<Slider style={{width:100, display:"inline-block"}}
			sliderStyle={{top:-13}} 
			step={step} 
			value={current} min={min} max={max}
			/>
		<FlatButton label="+" onClick={()=>onChange(Math.min(current+step,max))} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:18, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<FlatButton label={`${current}%`} 
			style={{...CompactButtonStyle}} 
			labelStyle={{fontSize:ButtonStyle.fontSize}}
			/>
	</div>
)

const Layout=({items, current, onChange, height:size})=>(
	<div style={{display:"flex", opacity:0.4}}>
		{items.map(({layout, icon, style={}})=>{
			if(layout==current){
				style.background=blue900
			}
			
			return (
				<SizeIconButton key={layout}
					size={size}
					padding={size/4}
					style={style}
					tooltip={`${layout} mode`}
					tooltipPosition="top-center"
					onClick={()=>onChange(layout)}
					>
					{icon}
				</SizeIconButton>
			)
		})}
	</div>
)

export default Status