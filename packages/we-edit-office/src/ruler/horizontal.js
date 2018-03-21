import React from "react"
import {SvgIcon} from "material-ui"

export default ({width,scale,
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	})=>(
	<div className="ruler horizontal" style={{width:width*scale,position:"relative"}}>
		<Scale {...{width:width*scale,from:leftMargin*scale,cm:scale*96/2.54}}/>
		<Margin style={{position:"absolute", top:0,left:0,width:leftMargin*scale}} onMove={setLeftMargin}/>
		<FirstLine style={{position:"absolute", top:0,left:(leftMargin+firstLine)*scale}} onMove={setFirstLine}/>
		<Indent style={{position:"absolute", top:0,left:(leftMargin+leftIndent)*scale}} onMove={setLeftIndent}/>
		<Margin style={{position:"absolute", top:0,right:0,width:rightMargin*scale}} onMove={setRightMargin}/>
		<Indent style={{position:"absolute", top:0,right:(rightMargin+rightIndent)*scale}} onMove={setRightIndent}/>
	</div>
)

const AT=(style,keys=Object.keys(style))=>"left,right".split(",").find(a=>keys.includes(a))

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

const Scale=({width,height=20,from,cm, })=>(
	<svg style={{width:width,height,backgroundColor:"white"}} 
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



const CM=({i,cm,nth=Math.abs(i+1)})=>(
	<g transform={`translate(${i*cm} 0)`}>
		<line x1={1*cm/4} y1={8} x2={1*cm/4} y2={12} stroke="lightgray" strokeWidth={1}/>
		<line x1={2*cm/4} y1={6} x2={2*cm/4} y2={14} stroke="lightgray" strokeWidth={1} />
		<line x1={3*cm/4} y1={8} x2={3*cm/4} y2={12} stroke="lightgray" strokeWidth={1} />
		{nth!=0 ? <text x={cm} y={13} textAnchor="middle">{nth}</text> : null}
	</g>
)
