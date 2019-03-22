import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setDisplayName,getContext} from "recompose"

import {when} from "we-edit"

import {Editors} from "we-edit-representation-html"

import {Composed} from "we-edit-representation-pagination"

const {Group}=Composed

export default class  Document extends Component{
	static displayName="text-document"
	static childContextTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		color: PropTypes.string,
		wrap: PropTypes.bool,
		background: PropTypes.string,
		activeColor: PropTypes.string,
	}

	getChildContext(){
		const {
			colorful,
			wrap,
			fonts="arial",
			size=11,
			lineHeight="140%",
			background,
			activeColor="beige"
		}=this.props
		return {colorful, fonts, size, wrap, lineHeight, background,activeColor}
	}

	render(){
		let {canvas,wrap,lineNo=true}=this.props
		if(lineNo){
			canvas=<TextCanvas wrap={wrap} canvas={canvas}/>
		}

		return (<Editors.Document key={wrap} margin={{left:32,right:10}} {...this.props} canvas={canvas}/>)
	}
}

class TextCanvas extends Component{
	static contextTypes={
		Measure: PropTypes.func,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
	}

	render(){
		let {canvas, content, wrap, viewport, ...props}=this.props
		let {pages}=content.props
		let count=0
		let totalHeight=0
		let maxLineContentWidth=0
		let lineHeight=0
		const contentWidth=a=>{
			try{
				return a.props.contentWidth || contentWidth(a.props.children)
			}catch(e){
				return 1
			}
		}
		pages=pages.map((a)=>{
			let col, page={...a,size:{...a.size,height:0}, columns:[col={...a.columns[0]}]}

			col.children=[...col.children]
			col.children.forEach(b=>{
				page.size.height+=b.props.height
				if(!wrap){
					maxLineContentWidth=Math.max(maxLineContentWidth, contentWidth(b))
				}
				count++
			})
			totalHeight+=page.size.height
			return page
		});

		((page, col=page.columns[0])=>{
			if(!wrap){
				let lineWidth=Math.max(viewport.width,page.margin.right+page.margin.left+maxLineContentWidth)
				pages.forEach(a=>a.size.width=lineWidth)
			}

			let line0=col.children[0]
			lineHeight=line0.props.height

			col.children=[
				<ActiveLine
					x={-page.margin.left}
					width={page.size.width-page.margin.right}
					height={lineHeight}/>,
				...col.children
			]
		})(pages[0]);

		content=React.cloneElement(content, {pages})
		content=canvas ? React.cloneElement(canvas, {content,...props}) : content
		const {fonts, size}=this.context
		return (
			<Fragment>
				<div style={{
						position:"sticky", left:0, width:30,height:0,
						fontFamily:fonts, fontSize:size,lineHeight:`${lineHeight}px`,
						cursor:"default", userSelect:"none",
					}}>
					<div style={{background:"lightgray", display:"flex", flexDirection:"row"}}>
						<div style={{flex:"1 100%", textAlign:"right", paddingRight:2}}>
							{new Array(count).fill(0).map((a,i)=><div key={i}>{i+1}</div>)}
						</div>
						<div style={{width:8, textAlign:"center"}}>
							{new Array(count).fill(0).map((a,i)=>
								<div key={i} style={{visibility:"hidden"}}
									onMouseOver={e=>e.target.style.visibility="visible"}
									onMouseLeave={e=>e.target.style.visibility="hidden"}
									>
									v
								</div>
							)}
						</div>
					</div>
				</div>
				{content}
			</Fragment>
		)
	}
}

const ActiveLine=compose(
	setDisplayName("ActiveLine"),
	when("cursorPlaced",({top,query})=>{
		return {y:top-query.svg.top}
	}),
	getContext({activeColor:PropTypes.string})
)(({x,y=0,height,width,activeColor})=>(
	<rect {...{x,y:parseInt(y-(height-height/1.4)/2),width:width,height,fill:activeColor}}/>
))
