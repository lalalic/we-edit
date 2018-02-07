import React from "react"
import {SvgIcon} from "material-ui"

const Ruler=({orientation="horizontal",...props})=>
	React.createElement(orientation=="horizontal" ? HorizontalRuler:VerticalRuler, props)

const HorizontalRuler=({unit="cm", length=21, 
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin, offset=leftMargin-1,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	})=>(
	<div className="ruler horizontal" style={{width:`${length}${unit}`}}>
		<Margin style={{left:0,width:`${leftMargin}${unit}`}} onMove={setLeftMargin}/>
		<Indent style={{left:`${leftMargin+leftIndent}${unit}`}} onMove={setLeftIndent}/>
		<div className="segments">
			{new Array(length).fill(0).map((a,i)=><Segment unit={unit} key={i} nth={i-offset}/>)}
		</div>
		<Indent style={{right:`${rightMargin+rightIndent}${unit}`}} onMove={setRightIndent}/>
		<Margin style={{right:0,width:`${rightMargin}${unit}`}} onMove={setRightMargin}/>
	</div>
)

const VerticalRuler=({unit="in", length=10, offset=0,
	topMargin=3, bottomMargin=3, setTopMargin, setBottomMargin,
	})=>(
	<div className="ruler vertical">
		<Margin at={`${topMargin}${unit}`} onMove={setTopMargin}/>
		<div  className="segments">
			{new Array(length).fill(0).map((a,i)=><Segment unit={unit} key={i} nth={i-offset}/>)}
		</div>
		<Margin at={`-${bottomMargin}${unit}`}  onMove={setBottomMargin}/>
	</div>
)

const  Segment=({unit="in", nth,
	rootStyle={width:`1${unit}`}, 
	})=>(
	<div style={rootStyle} className="segment">
		<div><span/></div>
		<div><span/></div>
		<div><span/></div>
		<div>
			{nth!==0 ? (<span>{Math.abs(nth)}</span>) : null}
		</div>
	</div>
)

const Margin=props=>(
	<div className="margin" {...props}>
		<div style={{width:5,float:"right",cursor:"hand",background:"black",opacity:0.4}}/>
	</div>
)
const Indent=props=>(
	<div className="indent" {...props}>
		<SvgIcon>
			<path d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>">
		</SvgIcon>
	</div>
)
const FirstLine=({at})=>(
	<div className="first-line">
		<SvgIcon>
			<path d="M0 11.5 L11.5 23 L23 23 L23 0 L11.5 0Z" fill="white" strokeWidth="1" stroke="gray"/>">
		</SvgIcon>
	</div>
)

export default Ruler