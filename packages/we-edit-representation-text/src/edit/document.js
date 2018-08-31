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
		lineHeight: PropTypes.string,
		wrap: PropTypes.bool
	}

	getChildContext(){
		const {color, fonts="arial", size=11, lineHeight="140%", wrap=true}=this.props
		return {color, fonts, size, lineHeight, wrap}
	}

	render(){
		return (<Editors.Document {...this.props}/>)
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
		const {canvas, content, ...props}=this.props
		return (
			<div style={{display:"flex", flexDirection:"collumn"}} ref="root">
				<LinesNo ref="lines"/>
				<div style={{zIndex:2}}>
					{canvas ? React.cloneElement(canvas, {pages,content,...props}) : content}
				</div>
			</div>
		)
	}
	
	componentDidMount1(){
		let  {Measure,fonts,size,lineHeight}=this.context
		lineHeight=new Measure({fonts,size}).height*parseInt(lineHeight)/100
		
		let {height}=this.refs.root.getBoundingClientRect()
		this.refs.lines.setState({lineHeight, lines: Math.ceil(height/lineHeight)})
	}
}

class LinesNo extends Component{
	state={lines:10}
	render(){
		const {lines,lineHeight}=this.state
		return (
			<Fragment>
				<div style={{background:"lightgray",lineHeight:`${lineHeight}px`,fontSize:"smaller",width:"2em"}}>
					{new Array(lines).fill(0).map((a,i)=>
						<div key={i} style={{textAlign:"right",marginRight:2, marginLeft:2}}>{i+1}</div>
					)}
				</div>
				<ActiveLine height={lineHeight}/>
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
