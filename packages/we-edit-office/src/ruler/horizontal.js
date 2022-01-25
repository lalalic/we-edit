import React, { Fragment } from "react"
import {onlyUpdateForKeys} from "recompose"
import {SvgIcon} from "material-ui"

import Movable from "../components/movable"

export default onlyUpdateForKeys("width,scale,leftMargin,rightMargin,firstLine,leftIndent,cm,threshold,cols,column".split(","))((
	{scale=1,
	width=0,cols=[], column,scaleHeight:height=20, markerSize=8,
	leftMargin=3, rightMargin=3, setLeftMargin, setRightMargin,setColGap,moveColGap,
	firstLine=0, leftIndent=0, rightIndent=0, setFirstLine, setLeftIndent, setRightIndent,
	cm=scale*96/2.54, threshold=5,
	children, col=cols[column],
	})=>{
		let fl=null
		return (
			<div className="ruler horizontal" style={{width:width*scale,position:"relative",height,margin: "0px auto 0px auto"}}>
				<Scale {...{width:width*scale,height,from:leftMargin*scale,cm}}/>

				{children && React.cloneElement(children,{col,scale,leftMargin, rightMargin})}

				{(()=>{
					return cols.reduce((segs,{x,width},i)=>{
						i+1<cols.length && segs.push([x+width,cols[i+1].x])
						return segs
					},[]).map(([x,x2],i)=><Col {...{key:i,x,width:x2-x,scale,height,i, threshold, setColGap, moveColGap}}/>)
				})()}
				
				{(()=>{
					if(!width)
						return null

					const indentStyle={position:"absolute",width:markerSize,height:markerSize}
					const halfMarkerSize=markerSize/2
					const moverWidth=3
					return (
						<Fragment>
							<Movable key="leftMargin" cursor="ew-resize" rodDx={moverWidth}
								style={{left:leftMargin*scale-moverWidth}}
								onMove={(dx,dy,{x})=>{
									if(Math.abs(dx)<threshold)
										return 
									setLeftMargin((leftMargin*scale+dx)/scale)
									return {x0:x}
								}}
								>
								{
									React.createElement(({style,...props})=>(
										<div style={{width:moverWidth,cursor:"ew-resize",top:0,opacity:0.6,position:"absolute",height,background:"black",...style}} 
											{...props}>
											<div style={{width:leftMargin*scale-moverWidth,right:moverWidth,cursor:"default",position:"absolute",height,background:"black"}}/>
										</div>	
									))
								}
							</Movable>
							<Movable key="rightMargin" cursor="ew-resize"
								style={{left:(width-rightMargin)*scale}}
								onMove={(dx,dy,{x})=>{
									if(Math.abs(dx)<threshold)
										return 
									setRightMargin((rightMargin*scale-dx)/scale)
									return {x0:x}
								}}
								>
								{
									React.createElement(({style,...props})=>(
										<div style={{width:moverWidth,cursor:"ew-resize",top:0,opacity:0.6,position:"absolute",height,background:"black",...style}} {...props}>
											<div style={{width:rightMargin*scale-moverWidth,left:moverWidth,cursor:"default",position:"absolute",height,background:"black",}}/>
										</div>	
									))
								}
							</Movable>

							<Movable ref={a=>fl=a} key="first" color="yellow" rodDx={halfMarkerSize}
								style={{left:(col.x+leftIndent+firstLine)*scale-halfMarkerSize}}
								onMove={(dx,dy,{x})=>{
									if(Math.abs(dx)<threshold)
										return 
									const width=(leftIndent+firstLine)*scale+dx
									setFirstLine((width-leftIndent*scale)/scale)
									return {x0:x}
								}}
								>
								<div title="First Line Indent" style={{...indentStyle, top:0}}>
									<Marker direction="bottom"/>
								</div>
							</Movable>

							<Movable key="left" color="blue" rodDx={halfMarkerSize}
								style={{left:(col.x+leftIndent)*scale-halfMarkerSize}}
								onMove={(dx,dy,{x})=>{
									if(Math.abs(dx)<threshold)
										return 
									const indent=leftIndent*scale+dx
									setLeftIndent(indent/scale)
									return {x0:x}
								}}
								>
								<div title="Left Indent" style={{...indentStyle, bottom:0}}>
									<Marker/>
								</div>
							</Movable>

							<Movable key="right" color="blue" rodDx={halfMarkerSize}
								style={{left:(col.x+col.width-rightIndent)*scale-halfMarkerSize}}
								onMove={(dx,dy,{x})=>{
									if(Math.abs(dx)<threshold)
										return 
									const indent=rightIndent*scale-dx
									setRightIndent(indent/scale)
									return {x0:x}}
								}
								>
								<div title="Right Indent" style={{...indentStyle,bottom:0}}>
									<Marker/>
								</div>
							</Movable>
						</Fragment>
					)
				})()}
			</div>
		)
})




class Col extends React.Component{
	constructor({x,width}){
		super(...arguments)
		this.state={x,width}
	}
	render(){
		const {i,x:x0,width:w,scale,height, setColGap, moveColGap, threshold}=this.props
		const {x,width}=this.state
		const style={position:"absolute",cursor:"ew-resize",top:0,height,width:3}
		return (
			<div style={{position:"absolute",top:0,left:x*scale,width:width*scale,height,background:"black",opacity:0.4}}>
				<Movable cursor="ew-resize" color="red" style={{left:0}}
					onMove={(dx,dy,{x})=>{
						if(Math.abs(dx)<threshold)
							return 
						setColGap({i,dx:-dx/scale})
						return {x0:x}
					}}
					>
					<div style={style}/>
				</Movable>
				
				<Movable cursor="move" color="red" style={{left:(width*scale-3)/2}} rodDx={1.5}
					onMove={(dx,dy,{x})=>{
						if(Math.abs(dx)<threshold)
							return 
						moveColGap({i,dx:-dx/scale})
						return {x0:x}
					}}
					>
					<div style={{...style,background:"gray",cursor:"move"}}/>
				</Movable>

				<Movable cursor="ew-resize" style={{left:width*scale}}
					onMove={(dx,dy,{x})=>{
						if(Math.abs(dx)<threshold)
							return 
						setColGap({i,dx:dx/scale,atEnd:true})
						return {x0:x}
					}}
					>
					<div style={style}/>
				</Movable>
			</div>
		)
	}

	componentDidUpdate({x:x0,width:w}){
		const {x,width}=this.props
		if(x!=x0 || width!=w){
			this.setState({x,width})
		}
	}
}

const Marker=({direction="top",degs={bottom:180}, style, ...props})=>(
	<SvgIcon {...props} style={{...style,width:"100%",height:"100%",display:"block"}}>
		<path transform={`rotate(${degs[direction]||0} 12 12)`}
			d="M11.5 0 L23 11.5 L23 23 L0 23 L0 11.5Z" fill="white" strokeWidth="1" stroke="gray"/>
	</SvgIcon>
)

const Scale=({width,height,from,cm, children, style})=>(
	<svg className="HorizontalScale" style={{width,height,backgroundColor:"white", ...style}}
		preserveAspectRatio="none"
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
		{nth!=0 ? <text x={cm} y={13} textAnchor="middle" fontSize={10}>{nth}</text> : null}
	</g>
)

const ColStart=({x})=>(
	<rect {...{x:x-1,width:3,height:8,y:6, fill:"white",stroke:"black",cursor:"ew-resize"}}/>
)

const ColEnd=ColStart
