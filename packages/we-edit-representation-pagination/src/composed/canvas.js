import React, {Component, PureComponent} from "react"
import PropTypes from "prop-types"

import Waypoint from "react-waypoint"
import Group from "./group"

class SmartShow extends PureComponent{
	state={display:false}
	render(){
		const {display}=this.state
		const {children,width,height,margin,precision,paper}=this.props
		return (
			<Waypoint 
				fireOnRapidScroll={false}
				onEnter={e=>{this.setState({display:true})}}
				>
				<g>
					{paper && <Paper {...{width,height,margin,fill:"white", precision,...paper}}/>}
					{display ? children : null}
				</g>
			</Waypoint>
		)
	}
}

class Paper extends PureComponent{
	render(){
		const {
			width,height, margin:{left=0,right=0,top=0,bottom=0}={}, precision=1, border=true,
			strokeWidth=1*precision, marginWidth=20*precision, ...props
		}=this.props
		return (
			<g className="paper">
				<rect {...props} {...{width,height}}/>
				{border && <path strokeWidth={strokeWidth} stroke="lightgray" fill="none" d={`
							M0 0 h${width} v${height} h${-width}z
							M${left-Math.min(left,marginWidth)} ${top} h${Math.min(left,marginWidth)} v${-Math.min(top,marginWidth)}
							M${left-Math.min(left,marginWidth)} ${height-bottom} h${Math.min(left,marginWidth)} v${Math.min(bottom,marginWidth)}
							M${width-right+Math.min(right,marginWidth)} ${height-bottom} h${-Math.min(right,marginWidth)} v${Math.min(bottom,marginWidth)}
							M${width-right+Math.min(right,marginWidth)} ${top} h${-Math.min(right,marginWidth)} v${-Math.min(top,marginWidth)}
						`}/>
					}
			</g>
			)
	}
}

export default class ComposedDocumentCanvas extends Component{
	static displayName="composed-document-default-canvas"
	static PageShow=SmartShow
	static contextTypes={
		media: PropTypes.string,
	}
	static propTypes={
		pages: PropTypes.arrayOf(PropTypes.object),
		pageGap: PropTypes.number,
		scale: PropTypes.number,
		document: PropTypes.object,
	}

	static defaultProps={
		pageGap:24,
		scale:1,
	}

	static getDerivedStateFromProps({document:{pages, props:{precision}},pageGap, scale}){
        return {pages,precision, pageGap, scale}
	}
	
	constructor(){
		super(...arguments)
		this.state={}
	}

	getComposed(pages,pageGap){
		const {precision=1}=this.state
		pageGap=pageGap*precision
		const content=pages.map(page=>page.createComposed2Parent())
		return content.reduce((size,{props:{width,height}})=>{
				return Object.assign(size,{
					width:Math.max(size.width,width),
					height:size.height+height+pageGap,
				})
			},{width:0,height:pageGap,composed:content})
	}

	render(){
		const {
			state:{pages, pageGap, scale,precision=1}, 
			props:{style,children,innerRef,document,pages:_1,pageGap:_2,scale:_3,precision:_4,paper,__sequentialCompose, ...props}
		}=this
		const {width,height,composed}=this.getComposed(pages, pageGap)
		return   (
			<svg
				{...props}
				className={this.constructor.displayName}
				ref={innerRef}
				preserveAspectRatio="xMidYMid"
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"transparent", width:width*scale/precision, height:height*scale/precision, ...style}}
				>
				{this.positionPages(composed, width)}
				{children}
			</svg>
		)
	}

	positionPages(pages,canvasWidth){
		const {state:{pageGap, precision}, props:{paper},context:{media}}=this
		const SmartShow=this.constructor.PageShow
		return (
			<Group y={pageGap*precision} x={0}>
				{pages.reduce((positioned, page)=>{
					const {width,height,margin,I,i}=page.props
					positioned.push(//use g to make Group ignore className and id for better merge
						<g key={I} className={"page"} id={`page${I}`} clipPath={`path("M0,0h${width}v${height}h${-width}Z")`}>
							<Group {...{y:positioned.y,x:(canvasWidth-width)/2}}>
								{media=="file" ? page :
								<SmartShow {...{
									I,
									children:page,
									width,height,margin,
									precision,paper,
								}}/>}
							</Group>
						</g>
					)
					positioned.y+=(height+pageGap*precision)
					return positioned
				},Object.assign([],{y:0}))}
			</Group>
		)
	}
	//follow same layout of positionPages
	static composedY(pages, pageGap){
        const last=pages[pages.length-1]
        if(!last)
            return 0
        const heightOfLast=last.context.parent.isAllChildrenComposed() ? last.props.height : last.composedHeight
        return pages.slice(0,pages.length-1).reduce((w,page)=>w+page.props.height+pageGap,heightOfLast)
	}

	static pageRect(I, svg){
		const page=svg.querySelector("#page"+I)
        return page && page.getBoundingClientRect()
	}
}
