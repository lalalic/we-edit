import React from "react"
import {SvgIcon} from "material-ui"

const Ruler=({orientation="horizontal",...props})=>
	React.createElement(orientation=="horizontal" ? HorizontalRuler:VerticalRuler, props)

const HorizontalRuler=({unit="in", length=10, offset=0,
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	})=>(
	<div className="ruler horizontal">
		<Margin at={`${leftMargin}${unit}`} onMove={setLeftMargin}/>
		<Indent at={`${leftMargin+leftIndent}${unit}`} onMove={setLeftIndent}/>
		<Indent at={`-${rightMargin+rightIndent}${unit}`} onMove={setRightIndent}/>
		<FirstLine at={`${leftMargin+firstLine}${unit}`} onMove={setFirstLine}/>
		<div>{new Array(length).fill(0).map((a,i)=><Segment unit={unit} key={i} nth={i-offset}/>)}</div>
		<Margin at={`-${rightMargin}${unit}`} onMove={setRightMargin}/>
	</div>
)

const VerticalRuler=({unit="in", length=10, offset=0,
	topMargin=3, bottomMargin=3, setTopMargin, setBottomMargin,
	})=>(
	<div className="ruler vertical">
		<Margin at={`${topMargin}${unit}`} onMove={setTopMargin}/>
		<div>{new Array(length).fill(0).map((a,i)=><Segment unit={unit} key={i} nth={i-offset}/>)}</div>
		<Margin at={`-${bottomMargin}${unit}`}  onMove={setBottomMargin}/>
	</div>
)

const  Segment=({unit="in", 
	rootStyle={width:`1${unit}`,margin:0,border:0,padding:0}, 
	style1={width:`0.25${unit}`,margin:0,border:0,padding:0}})=>(
	<div style={rootStyle}>
		<div style={style1}/>
		<div style={style1}/>
		<div style={style1}/>
		<div style={style1}/>
	</div>
)

const Margin=({at})=>(
	<div>
		<div style={{width:5,float:"right",cursor:"hand"}}/>
	</div>
)
const Indent=({at})=>(
	<div>
		<SvgIcon>
			<path d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>">
		</SvgIcon>
	</div>
)
const FirstLine=({at})=>(
	<div>
		<SvgIcon>
			<path d="M0 11.5 L11.5 23 L23 23 L23 0 L11.5 0Z" fill="white" strokeWidth="1" stroke="gray"/>">
		</SvgIcon>
	</div>
)

export default Ruler