import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Media from "./responsible-canvas/media"

export default class ComposedDocumentCanvas extends Component{
	static displayName="composed-document-default-canvas"
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

	static getDerivedStateFromProps({document, ...mySelf}){
		const {pages, props:{pageGap, scale, precision, content}}=document
		return {
			pages, precision,content,
			pageGap:pageGap!=undefined ? pageGap : mySelf.pageGap, 
			scale:scale||mySelf.scale,
		}
	}

	constructor(){
		super(...arguments)
		this.state={}
	}

	getComposed=memoize((pages,pageGap)=>{
		const content=pages.map((page,i)=>React.cloneElement(page.createComposed2Parent(),{key:i}))
		return content.reduce((size,{props:{width,height}})=>{
				return Object.assign(size,{
					width:Math.max(size.width,width),
					height:size.height+height+pageGap,
				})
			},{width:0,height:pageGap,composed:content})
	})

	render(){
		const {
			state:{pages, pageGap, scale,precision=1}, 
			props:{style,children,innerRef,document,pages:_1,pageGap:_2,scale:_3,precision:_4, ...props}
		}=this
		const {width,height,composed}=this.getComposed(pages, pageGap)
		return   (
			<svg
				{...props}
				ref={innerRef}
				preserveAspectRatio="xMidYMin"
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"transparent", width:width*scale*precision, height:height*scale*precision, ...style}}
				>
				<Media {...{pageGap:pageGap*precision, width,precision}}>
					{composed}
				</Media>
				{children}
			</svg>
		)
	}
}
