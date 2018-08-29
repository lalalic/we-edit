import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"
import Pagination,{SVGMeasure} from "we-edit-representation-pagination"

import Viewers from "./all"
import Editors from "./edit"

import Output from "./output"

export default class Html extends Representation.Base{
	static displayName="html"

	static defaultProps={
		type:"html"
	}
	
	static Output=Output
	
	constructor(){
		super(...arguments)
		this.state={}
		//@TODO: resizing is not good here, better to be on WeDocument
		this.resizeViewPort=this.resizeViewPort.bind(this)
	}
	
	componentDidMount(){
		window.addEventListener("resize", this.resizeViewPort)
	}
	
	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeViewPort)
	}
	
	resizeViewPort(){
		this.setState({resize:Date.now()})
	}

	render(){
		const {ViewerTypes=Viewers, EditorTypes=Editors,measure=SVGMeasure, type, children:doc, ...props}=this.props
		
		let children=doc
		/*
		if(doc){
			children=React.cloneElement(doc,{canvasProps:{canvas:<Canvas4SinglePageHeight {...doc.props.canvasProps}/>}})
		}
		*/
		return (
			<Pagination {...{ViewerTypes,EditorTypes,key:this.state.resize, ...props}}>
				{children}
			</Pagination>
		)
	}
	
	
}

const Canvas4SinglePageHeight=({canvas,pages,content, ...props})=>{
	if(pages[0]){
		pages[0].height=pages[0].columns[0].children.reduce((h,a)=>h+a.props.height,60)
	}
	return canvas ? React.cloneElement(canvas,{pages,content,...props}) : content
}

(function(A){
	let install=A.install.bind(A)
	A.install=function(){
		install(...arguments)
		A.Output.install()
	}
	
	let uninstall=A.uninstall.bind(A)
	A.uninstall=function(){
		uninstall(...arguments)
		A.Output.uninstall()
	}
})(Html);

Html.install()
