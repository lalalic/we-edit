import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setDisplayName} from "recompose"

import {when} from "we-edit"

import {Editors} from "we-edit-representation-html"

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
		lineHeight: PropTypes.string
	}

	getChildContext(){
		const {color, size=this.context.size, fonts=this.context.fonts,lineHeight=this.context.lineHeight}=this.props
		return {
			color,
			size:size||11,
			fonts:fonts||"arial",
			lineHeight:lineHeight||"140%"
		}
	}

	render(){
		return (<Editors.Document {...this.props} canvas={<TextCanvas/>}/>)
	}
}

class TextCanvas extends Component{
	render(){
		const {canvas, content, ...props}=this.props
		return (
			<div style={{display:"flex", flexDirection:"collumn"}}>
				<LinesNo/>
				{canvas ? React.cloneElement(canvas, {pages,content,...props}) : content}
			</div>
		)
	}
}

class LinesNo extends Component{
	static contextTypes={
		Measure: PropTypes.func,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
	}
	state={lines:10}
	render(){
		const {lines}=this.state
		const {Measure,fonts,size,lineHeight}=this.context
		let height=new Measure({fonts,size}).height
		height=height*parseInt(lineHeight)/100
		return (
			<Fragment>
				<div style={{background:"lightgray",lineHeight:`${height}px`,fontSize:"smaller"}}>
					{new Array(lines).fill(0).map((a,i)=>
						<div key={i} style={{textAlign:"right",marginRight:2, marginLeft:2}}>{i+1}</div>
					)}
				</div>
				<ActiveLine height={height}/>
			</Fragment>
		)
	}
}

const ActiveLine=compose(
	setDisplayName("ActiveLine"),
	when("cursorPlaced",({top})=>{
		return {top}
	}),
)(({top,height})=>(<div style={{position:"absolute",left:0,top,width:"100%",height,background:"lightblue",opacity:0.5}}>&nbsp;</div>))
