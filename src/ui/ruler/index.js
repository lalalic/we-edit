import React from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps,withProps} from "recompose"
import {connect} from "react-redux"

import {SvgIcon} from "material-ui"

import {ACTION} from "we-edit"

const Ruler=({orientation="horizontal",...props})=>
	React.createElement(orientation=="horizontal" ? HorizontalRuler:VerticalRuler, props)

const HorizontalRuler=({width, cm=96/2.54,
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin, offset=leftMargin-1,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	})=>(
	<div className="ruler horizontal" style={{width}}>
		<Scale {...{width,from:leftMargin,cm}}/>
		<Margin style={{left:0,width:leftMargin}} onMove={setLeftMargin}/>
		<FirstLine style={{left:leftMargin+firstLine}} onMove={setFirstLine}/>
		<Indent style={{left:leftMargin+leftIndent}} onMove={setLeftIndent}/>
		<Margin style={{right:0,width:rightMargin}} onMove={setRightMargin}/>
		<Indent style={{right:rightMargin+rightIndent}} onMove={setRightIndent}/>
	</div>
)

const VerticalRuler=({unit="cm", length=10, offset=0,
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

const  Segment=({unit="cm", nth,
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

const AT=(style,keys=Object.keys(style))=>"left,right,top,bottom".split(",").find(a=>keys.includes(a))

const Margin=({style, onMove, at=AT(style)})=>(
	<div className={`margin ${at}`} style={style} title={`${at} Margin`}>
		<div className="mover"/>
	</div>
)

const Indent=({style,onMove,at=AT(style)})=>(
	<div className={`indent ${at}`} style={style} title={`${at} Indent`}>
		<Marker/>
	</div>
)

const FirstLine=({style, onMove})=>(
	<div className="first-line left" style={style} title="First Line Indent">
		<Marker direction="bottom"/>
	</div>
)

const Marker=({direction="top",degs={bottom:180}})=>(
	<SvgIcon>
		<path transform={`rotate(${degs[direction]||0} 12 12)`}
			d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>">
	</SvgIcon>	
)

const Scale=({width,height=20,from,cm})=>(
	<svg style={{width,height,backgroundColor:"white"}} 
		viewBox={`0 0 ${width} ${height}`} >
		<g transform={`translate(${from} 0)`}>
		{
			new Array(Math.ceil(from/cm)).fill(0)
				.map((a,i)=><CM cm={cm} key={-i} i={-i-1}/>)
		}
		</g>
		<g transform={`translate(${from} 0)`}>
		{
			new Array(Math.ceil((width-from)/cm)).fill(0)
				.map((a,i)=><CM cm={cm} key={i} i={i}/>)
		}
		</g>
		
	</svg>
)

const CM=({i,cm=96/2.54, nth=Math.abs(i+1)})=>(
	<g transform={`translate(${i*cm} 0)`}>
		<line x1={1*cm/4} y1={8} x2={1*cm/4} y2={12} stroke="lightgray" strokeWidth={1}/>
		<line x1={2*cm/4} y1={6} x2={2*cm/4} y2={14} stroke="lightgray" strokeWidth={1} />
		<line x1={3*cm/4} y1={8} x2={3*cm/4} y2={12} stroke="lightgray" strokeWidth={1} />
		{nth!=0 ? <text x={cm} y={13} textAnchor="middle">{nth}</text> : null}
	</g>
)

{/*
<div className="segments">
	<div style={{right:Math.ceil(leftMargin/cm)*cm-leftMargin,top:0}}>
		{new Array(Math.ceil(leftMargin/cm)).fill(0)
			.map((a,i)=><Segment key={-i} nth={-i}/>)
			.reverse()
		}
	</div>
	<div style={{left:leftMargin,top:0}}>
		{new Array(Math.ceil((width-leftMargin)/cm)).fill(0)
			.map((a,i)=><Segment key={i} nth={i+1}/>)}
	</div>
</div>	
	
*/}
export default compose(
	setDisplayName("Ruler"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object
	}),
	withProps(({store:{dispatch},doc})=>({
		doc,
		setLeftMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{left:value}}}))
		},
		setRightMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{right:value}}}))
		},
		setBottomMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{bottom:value}}}))
		},
		setTopMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{top:value}}}))
		},
		setFirstLine(){
			dispatch(ACTION.Style.update({paragraph:{indent:{firstLine:value}}}))
		},
		setLeftIndent(){
			dispatch(ACTION.Style.update({paragraph:{indent:{left:value}}}))
		},
		setRightIndent(){
			dispatch(ACTION.Style.update({paragraph:{indent:{right:value}}}))
		}
	})),
	connect(state=>({selection:state.get('selection')})),
	withProps(({doc})=>{
		let selection=doc.selection()
		let {
				pgSz:{width,height}, 
				pgMar:{left:leftMargin,top:topMargin,right:rightMargin,bottom:bottomMargin}
			}=selection.props("section")
			
		let {
			indent:{left:leftIndent,right:rightIndent,firstLine}={}
		}=selection.props("paragraph")
			
		return {width,height,leftMargin,topMargin,bottomMargin,rightMargin,leftIndent,rightIndent,firstLine}
	}),
)(props=><Ruler {...props}/>)