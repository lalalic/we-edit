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

		return (<Editors.Document key={wrap} margin={{left:30,right:10}} {...this.props} canvas={canvas}/>)
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
		let count=1
		let totalHeight=0
		let maxLineContentWidth=0
		const contentWidth=a=>{
			try{
				return a.props.contentWidth || contentWidth(a.props.children)
			}catch(e){
				return 1
			}
		}
		pages=pages.map((a)=>{
			let col, page={...a,size:{...a.size,height:0}, columns:[col={...a.columns[0]}]}

			col.children=col.children.map((b)=>{
				page.size.height+=b.props.height
				if(!wrap){
					maxLineContentWidth=Math.max(maxLineContentWidth, contentWidth(b))
				}
				return (<LineN children={b} i={count++}/>)
			})
			totalHeight+=page.size.height
			return page
		});

		((page, col=page.columns[0])=>{
			if(!wrap){
				let lineWidth=Math.max(viewport.width,page.margin.right+page.margin.left+maxLineContentWidth)
				pages.forEach(a=>a.size.width=lineWidth)
			}

			let lineN0=col.children[0]
			let line0=lineN0.props.children
			col.children=[
				<ActiveLine  x={-page.margin.left}
					width={page.size.width-page.margin.right}
					height={line0.props.height}/>,

				<rect x={-page.margin.left} y={0} width={page.margin.left-5}
					height={totalHeight} fill="lightgray"/>,
				...col.children
			]
		})(pages[0]);

		content=React.cloneElement(content, {pages})
		return canvas ? React.cloneElement(canvas, {content,...props}) : content

	}
}

const LineN=({i, children:line})=>{
	let y=line.props.height/2
	return React.cloneElement(line, {children:[
			<Group x={-20} y={y+4} width={0} height={0} >
				<text style={{fontSize:"smaller"}}>{i}</text>
			</Group>,
			...React.Children.toArray(line.props.children)
		]
	})
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
