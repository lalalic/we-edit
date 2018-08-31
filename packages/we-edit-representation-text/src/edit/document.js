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
		let count=0
		pages=pages.reduce((pagesWithNo, a)=>{
			let page={...a},col
			page.columns=[col={...a.columns[0]}]
			col.children=col.children.reduce((linesWithNo, b)=>{
				linesWithNo.push(<LineN children={b} i={count++}/>)
				return linesWithNo
			},[])
			pagesWithNo.push(page)
			return pagesWithNo
		},[])
		
		content=React.cloneElement(content, {pages})
		return canvas ? React.cloneElement(canvas, {content,...props}) : content
	}
}

const LineN=({i, children:line})=>React.cloneElement(line, {children:[
		<Group x={-20} y={15} width={0} height={0} >
			<text style={{fontSize:"smaller"}}>{i}</text>
		</Group>,
		...React.Children.toArray(line.props.children)
		]
})


const ActiveLine=compose(
	setDisplayName("ActiveLine"),
	when("cursorPlaced",({top})=>{
		return {top}
	}),
)(({top,height})=>(<div style={{position:"absolute",left:0,top,width:"100%",height,background:"lightblue",opacity:0.5}}>&nbsp;</div>))
