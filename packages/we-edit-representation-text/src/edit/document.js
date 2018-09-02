import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setDisplayName} from "recompose"

import {when} from "we-edit"

import {Editors} from "we-edit-representation-html"

import {Composed} from "we-edit-representation-pagination"

const {Group}=Composed

export default class  Document extends Component{
	static contextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
	}

	static childContextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		wrap: PropTypes.bool
	}

	state={viewport:0}

	getChildContext(){
		const {color, fonts="arial", size=11, lineHeight="140%", wrap=true}=this.props
		return {color, fonts, size, lineHeight, wrap}
	}

	render(){
		let {canvas,lineNo=true}=this.props
		if(lineNo){
			canvas=<TextCanvas canvas={canvas}/>
		}

		return (<Editors.Document {...this.props} canvas={canvas}/>)
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
		let {canvas, content, ...props}=this.props
		let {pages}=content.props
		let count=1
		let totalHeight=0
		pages.forEach(page=>{
			let col=page.columns[0]
			totalHeight+=(page.size.height=col.children.reduce((h,a)=>h+a.props.height,0))
		})

		pages=pages.reduce((pagesWithNo, a)=>{
			let page={...a},col
			page.columns=[col={...a.columns[0]}]

			col.children=col.children.reduce((linesWithNo, b)=>{
				linesWithNo.push(<LineN children={b} i={count++}/>)
				return linesWithNo
			},count==1 ? [
				<rect x={-30} y={0} width={25} height={totalHeight} fill="lightgray"/>,
				<ActiveLine  x={30}
					width={page.size.width-page.margin.right-page.margin.left}
					height={col.children[0].props.height}/>
			] : [])

			pagesWithNo.push(page)
			return pagesWithNo
		},[])

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
)(({x,y=0,height,width})=>(
	<rect {...{x:0,y:parseInt(y-(height-height/1.4)/2),width,height,fill:"red",style:{opacity:0.5}}}/>
))
