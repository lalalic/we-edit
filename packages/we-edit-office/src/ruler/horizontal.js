import React from "react"
import {onlyUpdateForKeys} from "recompose"
import {SvgIcon} from "material-ui"

import Movable from "../components/movable"

export default onlyUpdateForKeys("width,scale,leftMargin,rightMargin,firstLine,leftIndent,cm,step,cols,column".split(","))((
	{width=0,scale=1,cols=[], column,
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	cm=scale*96/2.54, step=cm/8, trim=(x,dx)=>Math[dx>0 ? 'ceil' : 'floor']((x+dx)/step)*step,
	children,
	})=>{
		let fl=null
		return (
			<div className="ruler horizontal" style={{width:width*scale,position:"relative"}}>
				<Scale {...{width:width*scale,from:leftMargin*scale,cm, children}}>
					{cols && (()=>{
							const all=cols.map(({x,width},i)=>[<ColStart x={x} key={i+"0"}/>,<ColEnd x={x+width} key={i+"1"}/>]).flat()
							all.pop(), all.shift()
							return all.map((a,i)=>{
								if(i%2==0) {
									const b=all[i+1]
									return [
										<rect {...{key:i+"2",y:0,height:20,x:a.props.x-2,width:b.props.x-a.props.x+4,fill:"lightgray"}}/>,
										a
									]
								}
								return a
							}).flat()
							
						})()
					}
					<Margin {...{y:0,x:0,width:leftMargin*scale,height:20,fillOpacity:0.6}} onMove={setLeftMargin}/>

					<Margin {...{y:0,x:(width-rightMargin)*scale,width:rightMargin*scale,height:20,fillOpacity:0.6}} onMove={setRightMargin}/>
				</Scale>
				{
					((leftMargin, rightMargin, col=cols[column])=>{
						if(!width)
							return null
						if(col){
							leftMargin=col.x
							rightMargin=width-col.x-col.width
						}
						return [
							<Movable ref={a=>fl=a} key="first"
								onAccept={dx=>setFirstLine((trim((leftIndent+firstLine)*scale,dx)-leftIndent*scale)/scale)}
								onMove={dx=>({style:{position:"absolute", top:0,left:leftMargin*scale+trim((leftIndent+firstLine)*scale,dx)}})}
								>
								<FirstLine style={{position:"absolute", top:0,left:(leftMargin+leftIndent+firstLine)*scale}}/>
							</Movable>,
							<Movable key="left"
								onAccept={dx=>{
									fl.setState({move:false})
									setLeftIndent(trim(leftIndent*scale,dx)/scale)
								}}
								onMove={dx=>{
									fl.setState({move:true,x0:0,y0:0,x:dx,y:0})
									return {style:{position:"absolute", top:0,left:leftMargin*scale+trim(leftIndent*scale,dx)}}
								}}
								>
								<Indent style={{position:"absolute", top:0,left:(leftMargin+leftIndent)*scale}}/>
							</Movable>,
							
							<Movable key="right"
								onAccept={dx=>setRightIndent(trim(rightIndent*scale,-dx)/scale)}
								onMove={dx=>({style:{position:"absolute", top:0,right:rightMargin*scale+trim(rightIndent*scale,-dx)}})}
								>
								<Indent style={{position:"absolute", top:0,right:(rightMargin+rightIndent)*scale}}/>
							</Movable>
						]
					})(leftMargin,rightMargin)
				}
			</div>
		)
})

const AT=(style,keys=Object.keys(style))=>"left,right".split(",").find(a=>keys.includes(a))

const Margin=({onMove,...props})=>(
	<rect {...props}/>
)

const Indent=({style,at=AT(style), ...props})=>(
	<div className={`indent ${at}`} style={style} title={`${at} Indent`} {...props}>
		<Marker/>
	</div>
)

const FirstLine=props=>(
	<div className="first-line left" {...props} title="First Line Indent">
		<Marker direction="bottom"/>
	</div>
)

const Marker=({direction="top",degs={bottom:180}, ...props})=>(
	<SvgIcon {...props}>
		<path transform={`rotate(${degs[direction]||0} 12 12)`}
			d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>
	</SvgIcon>
)

const Scale=({width,height=20,from,cm, children})=>(
	<svg style={{width:width,height,backgroundColor:"white"}}
		viewBox={`0 0 ${width} ${height}`} >
		<symbol id="marker" viewBox="0 0 60 60">
			<path d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>
		</symbol>
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
		{children}
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

const ColStart=({x})=>(
	<rect {...{x:x-1,width:3,height:8,y:6, fill:"white",stroke:"black",cursor:"ew-resize"}}/>
)

const ColEnd=ColStart
