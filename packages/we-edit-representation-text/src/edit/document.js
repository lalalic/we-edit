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

		return (<Editors.Document margin={{left:30,right:10}} {...this.props} canvas={canvas}/>)
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
		let {canvas, wrap, content, viewport, ...props}=this.props
		let {pages}=content.props
		let count=1
		let totalHeight=0,maxContentWidth=0
		const contentWidth=b=>{
			try{
				return b.props.contentWidth || contentWidth(b.props.children)
			}catch(e){
				return 1
			}
		}
		pages=pages.map(a=>{
			let page={...a, size:{...a.size, height:0}, columns:[...a.columns]}
			let col=page.columns[0]

			col.children=col.children.map(b=>{
				page.size.height+=b.props.height
				if(!wrap){
					maxContentWidth=Math.max(maxContentWidth,contentWidth(b))
				}
				return (<LineN children={b} i={count++}/>)
			})

			totalHeight+=page.size.height
			return page
		});

		((page,col=page.columns[0])=>{
			if(!wrap){
				let width=Math.max(viewport.width, maxContentWidth+page.margin.left+page.margin.right)
				pages.forEach(a=>a.size.width=width)
			}

			col.children=[
				<ActiveLine  x={-page.margin.left}
					width={page.size.width-page.margin.right}
					height={col.children[0].props.children.props.height}/>,

				<rect x={-page.margin.left} y={0} width={page.margin.left-5}
					height={totalHeight} fill="lightgray"/>,
				...col.children
			]
		})(pages[0]);

		content=React.cloneElement(content, {pages})
		content=canvas ? React.cloneElement(canvas, {content,...props}) : content
		return content

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
