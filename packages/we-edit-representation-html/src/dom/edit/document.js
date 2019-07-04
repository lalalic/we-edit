import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

const {Document, Section, Frame, Page}=Editors
const FixPageSize=({content, canvas, ...props})=>{
	const {height}=content.props.viewport
	const pages=content.props.pages.map(page=>{
		const {margin:{top=0,bottom=0}}=page.props
		return page.clone({height:Math.max(page.columns[0].currentY+top+bottom,height)})
	})

	content=React.cloneElement(content,{pages})

	return canvas ? React.cloneElement(canvas, {content,...props}) : content
}

export default class extends Component{
	static displayName="html-document"
	static defaultProps={
		margin:{
			left:10,
			right:10,
			top:10,
			bottom:10
		}
	}

	static contextTypes={
		wrap: PropTypes.bool,
	}

	static childContextTypes={
		margin: PropTypes.object,
		paper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				border:PropTypes.bool
			})
		])
	}

	constructor(){
		super(...arguments)
		this.state={}
		let resizeTimeout=null
		this.resizeViewPort=()=>{
			if(!resizeTimeout){
				resizeTimeout=setTimeout(()=>{
					resizeTimeout=null
					this.setState({resize:Date.now()})
				},66)
			}
		}
	}

	componentDidMount(){
		window.addEventListener("resize", this.resizeViewPort)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeViewPort)
	}

	getChildContext(){
		return {
			paper:{border:false},
			margin:this.props.margin
		}
	}

	render(){
		const {canvas, children, ...props}=this.props
		return 	<ViewportDocument key={this.state.resize} {...props} pageGap={0} wrap={this.context.wrap}>
					{children}
				</ViewportDocument>
	}
}

class ViewportDocument extends Document{
	static childContextTypes={
		...Document.childContextTypes,
		viewport: PropTypes.object,
	}

	getChildContext(){
		return Object.assign(super.getChildContext(),{
			viewport: this.state.viewport
		})
	}

	appendComposed(frame){
		if(!frame)
			return 
		const {wrap=true,margin}=this.props
		const {viewport}=this.state
		if(this.computed.composed.length==0){
			this.computed.composed.push(
				new ViewportDocument.Page({
					I:0,
					margin,
					width:wrap ? viewport.width : Number.MAX_SAFE_INTEGER,
                	height:Number.MAX_SAFE_INTEGER 
				},{
					parent:this,
					getComposer:this.getComposer.bind(this)
				})
			)
		}
		const page=this.computed.composed[0]
		page.appendComposed(frame)
	}

	componentDidUpdate(){
		const page=this.computed.composed[0]
		if(page){
			page.props.height=page.composedHeight
		}
		super.componentDidUpdate(...arguments)
	}


	static Page=class extends Page.factory(Frame.editableLike(Frame.Columnable)){
		render(){
			const {props:{width,margin}}=this
			const height=this.composedHeight
			return React.cloneElement(super.createComposed2Parent(),{key:0,width,height,margin})
		}
	}
}
