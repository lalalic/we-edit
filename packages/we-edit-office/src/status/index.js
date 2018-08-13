import React,{PureComponent, Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, mapProps,withProps,setDisplayName} from "recompose"
import {Toolbar, ToolbarGroup, FlatButton, IconButton, Slider} from "material-ui"
import {blue800, blue900} from "material-ui/styles/colors"
import SizeIconButton from "../components/size-icon-button"
import {when} from "we-edit"

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
		muiTheme: PropTypes.object,
	}),
	mapProps(({muiTheme,layout,scale,setScale,style})=>{
		return {
			layout,scale,style,
			height:muiTheme.button.height
		}
	})
)(({scale, height, layout, style})=>(
	<div style={{...RootStyle,height,...style}}>
		<Page/>
		<Words/>
		<div style={{flex:"1 100%"}}/>
		{layout.items.length<2 ? null : <Layout height={height} {...layout}/>}
		<Scale {...scale}/>
	</div>
))

const Page=compose(
	getContext({
		selection: PropTypes.object
	}),
	withProps(({selection})=>{
		if(selection){
			let props=selection.props("page")
			if(props)
				return {current: props.page}
		}
	}),
	when("composed.all",total=>({total})),
	when("composed",currentTotal=>({currentTotal})),
)(({
	current=0,
	currentTotal=0, 
	total=0, 
	showTotal=Math.max(total,currentTotal)
})=>(
	<FlatButton style={ButtonStyle}>
		PAGE {current+1} OF {showTotal}{showTotal!==total ? ".." : ""}
	</FlatButton>
))

class Words extends PureComponent{
	static contextTypes={
		events: PropTypes.object
	}

	constructor(props, {events}){
		super(...arguments)
		this.state={total:0}
		if(events){
			events.on("words",pending=>{
				this.setState(({total})=>({total:total+pending}))
			})
		}
	}

	render(){
		return (
			<FlatButton style={ButtonStyle}>
				{this.state.total} WORDS
			</FlatButton>
		)
	}
}

const Scale=({
	current=100,max=200,min=10,step=10,
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
