import React,{PureComponent, Component} from "react"
import PropTypes from "prop-types"
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
	mapProps(({muiTheme,channel,scale,setScale,style})=>{
		return {
			channel,scale,style,
			height:muiTheme.button.height
		}
	})
)(({scale, height, channel, style})=>(
	<div style={{...RootStyle,height,...style}}>
		<Page/>
		<Words/>
		<div style={{flex:"1 100%"}}/>
		{channel.items.length<2 ? null : <Channel height={height} {...channel}/>}
		<Scale {...scale}/>
	</div>
))

const Page=compose(
	getContext({
		selection: PropTypes.object
	}),
	withProps(({selection})=>{
		if(selection){
			let props=selection.props("page",false)
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
			events.on("words",this.handler=pending=>{
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

	componentWillUnmount(){
		if(this.context.events){
			this.context.events.removeListener("words",this.handler)
		}
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

const Channel=({items, current, onChange, height:size})=>(
	<div style={{display:"flex", opacity:0.4}}>
		{items.map(({channel, icon, style={}})=>{
			if(channel==current){
				style.background=blue900
			}

			return (
				<SizeIconButton key={channel}
					size={size}
					padding={size/4}
					style={style}
					tooltip={`${channel} mode`}
					tooltipPosition="top-center"
					onClick={()=>onChange(channel)}
					>
					{icon}
				</SizeIconButton>
			)
		})}
	</div>
)

export default Status
