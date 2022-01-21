import React from "react"
import {onlyUpdateForKeys} from "recompose"
import Movable from "../components/movable"

export default onlyUpdateForKeys(['height','scale','topMargin','bottomMargin',])(
	({height=0, scale=1, scaleWidth:width=20,children, cursor="ns-resize",
	topMargin=3, bottomMargin=3,setTopMargin, setBottomMargin,
	cm=scale*96/2.54, step=cm/8, trim=(y,dy)=>Math[dy>0 ? 'ceil' : 'floor']((y+dy)/step)*step,
	})=>(
	<div className="ruler vertical" style={{height:height*scale,position:"relative"}}>
		<Scale {...{height:height*scale,width,from:topMargin*scale, cm, children}}/>

		<Movable key="topMargin" cursor={cursor}
			onMove={(dx,dy,{y})=>{
				const height=trim(topMargin*scale,dy)
				setTopMargin(height)
				return {y0:y,height}
			}}
			>
			{React.createElement(({height, moverWidth=3,style, ...props})=>(
				<div style={{...style,height:moverWidth,top:height-moverWidth,cursor,left:0,opacity:0.6}} {...props}>
					<div style={{...style,height:height-moverWidth,bottom:moverWidth,cursor:"default"}}/>
				</div>
			),{height:topMargin*scale,style:{position:"absolute",width,background:"black"}})}
		</Movable>

		<Movable key="bottomMargin" cursor={cursor}
			onMove={(dx,dy,{y})=>{
				const height=trim(bottomMargin*scale,-dy)
				setBottomMargin(height/scale)
				return {y0:y,height}
			}}
			>
			{React.createElement(({height, moverWidth=3, style, ...props})=>(
				<div style={{...style,height:moverWidth,bottom:height-moverWidth,cursor,left:0,opacity:0.6}} {...props}>
					<div style={{...style,height:height-moverWidth,top:moverWidth,cursor:"default"}}/>
				</div>
			),{height:bottomMargin*scale,style:{position:"absolute",width,background:"black"},})}
		</Movable>
	</div>
))

const Scale=({width,height,from,cm=96/2.54, children})=>(
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
		{children}
	</svg>
)



const CM=({i,cm,nth=Math.abs(i+1)})=>(
	<g transform={`translate(0 ${i*cm})`}>
		<line y1={1*cm/4} x1={8} y2={1*cm/4} x2={12} stroke="lightgray" strokeWidth={1}/>
		<line y1={2*cm/4} x1={6} y2={2*cm/4} x2={14} stroke="lightgray" strokeWidth={1} />
		<line y1={3*cm/4} x1={8} y2={3*cm/4} x2={12} stroke="lightgray" strokeWidth={1} />
		{nth!=0 ? <text y={cm} x={13} textAnchor="middle" fontSize={10}>{nth}</text> : null}
	</g>
)
