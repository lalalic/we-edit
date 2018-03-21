import React from "react"

export default ({height, footer, header, scale,
	topMargin=3, bottomMargin=3,
	setTopMargin, setBottomMargin,
	})=>(
	<div className="ruler vertical">
		<Scale {...{height:height*scale,from:topMargin*scale, cm:scale*96/2.54}}/>
		<Margin style={{position:"absolute",top:0, left:0, height:topMargin*scale}} onMove={setTopMargin}/>
		<Margin style={{position:"absolute", bottom:0, left:0, height:bottomMargin*scale}}
			onMove={setBottomMargin}/>
	</div>
)


const AT=(style,keys=Object.keys(style))=>"top,bottom".split(",").find(a=>keys.includes(a))

const Margin=({style, onMove, at=AT(style)})=>(
	<div className={`margin ${at}`} style={style} title={`${at} Margin`}>
		<div className="mover"/>
	</div>
)

const Scale=({width=20,height,from,cm=96/2.54, scale})=>(
	<svg style={{width,height,backgroundColor:"white"}} 
		viewBox={`0 0 ${width} ${height}`} >
		<g transform={`translate(0 ${from})`}>
		{
			new Array(Math.ceil(from/cm)).fill(0)
				.map((a,i)=><CM cm={cm} key={-i} i={-i-1}/>)
		}
		</g>
		<g transform={`translate(0 ${from})`}>
		{
			new Array(Math.ceil((height-from)/cm)).fill(0)
				.map((a,i)=><CM cm={cm} key={i} i={i}/>)
		}
		</g>

	</svg>
)



const CM=({i,cm,nth=Math.abs(i+1)})=>(
	<g transform={`translate(0 ${i*cm})`}>
		<line y1={1*cm/4} x1={8} y2={1*cm/4} x2={12} stroke="lightgray" strokeWidth={1}/>
		<line y1={2*cm/4} x1={6} y2={2*cm/4} x2={14} stroke="lightgray" strokeWidth={1} />
		<line y1={3*cm/4} x1={8} y2={3*cm/4} x2={12} stroke="lightgray" strokeWidth={1} />
		{nth!=0 ? <text y={cm} x={13} textAnchor="middle">{nth}</text> : null}
	</g>
)
