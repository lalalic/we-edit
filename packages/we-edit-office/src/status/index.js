import React from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps,setDisplayName, onlyUpdateForKeys} from "recompose"
import {FlatButton, Slider} from "material-ui"
import {blue800, blue900} from "material-ui/styles/colors"
import SizeIconButton from "../components/size-icon-button"
import {connect, whenSelectionChangeDiscardable,getStatistics,getUI, ACTION} from "we-edit"

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
	mapProps(({muiTheme,channel,style,page, words, scale,children})=>(
		{channel,style,height:muiTheme.button.height,page, words, scale,children}
	)),
	onlyUpdateForKeys(['height','channel'])
)(({height, channel, style, children, page=<Page/>, words=<Words/>, scale=<Scale/>})=>(
	<div style={{...RootStyle,height,...style}} id="status">
		{page}
		{words}
		{children}
		<div style={{flex:"1 100%"}}/>
		{channel.items.length<2 ? null : <Channel height={height} {...channel}/>}
		{scale}
	</div>
))

const Page=compose(
	whenSelectionChangeDiscardable(({selection},state)=>{
		const {pages:total=0,allComposed}=getStatistics(state)
		return {total,allComposed, current: selection?.props("page",false)?.page}
	})
)(({current=0,total=0,allComposed})=>(
	<FlatButton style={ButtonStyle}>
		PAGE {current+1} OF {total}{!allComposed ? ".." : ""}
	</FlatButton>
))

const Words=connect(state=>({...getStatistics(state)}))(({words=0,allComposed})=>(
	<FlatButton style={ButtonStyle}>
		{`${words}${allComposed?'':'..'}`} WORDS
	</FlatButton>
))


const Scale=connect(state=>({current:parseInt((getUI(state).scale||1)*100)}))(({
	current,max=200,min=10,step=10,dispatch, round=a=>Math.floor(a/10)*10,
	onChange=scale=>dispatch(ACTION.UI({scale:scale/100}))
	})=>(
	<div style={{display:"flex"}} id="scale">
		<FlatButton label="-" onClick={()=>onChange(Math.max(round(current-step),min))}
			style={{...CompactButtonStyle}}
			labelStyle={{fontSize:20, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<Slider style={{width:100, display:"inline-block"}}
			sliderStyle={{top:-13}}
			step={step}
			onChange={(e,newValue)=>onChange(newValue)}
			value={current} min={min} max={max}
			/>
		<FlatButton label="+" onClick={()=>onChange(Math.min(round(current+step),max))}
			style={{...CompactButtonStyle}}
			labelStyle={{fontSize:18, fontWeight:700,paddingRight:4,paddingLeft:4}}/>
		<FlatButton label={`${current}%`}
			style={{...CompactButtonStyle}}
			labelStyle={{fontSize:ButtonStyle.fontSize}}
			/>
	</div>
))

const Channel=({items, current, onChange, height:size})=>(
	<div style={{display:"flex", opacity:0.4}}>
		{items.map(({channel, icon, style={}})=>{
			if(channel==current){
				style.background=blue900
			}
			
			return (
				<SizeIconButton key={channel}
					iconStyle={{color:"white"}}
					size={size}
					padding={size/4}
					style={style}
					title={channel}
					onClick={()=>onChange(channel)}
					>
					{icon}
				</SizeIconButton>
			)
		})}
	</div>
)

export default Status
