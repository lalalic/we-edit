import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Media from "./responsible/media"

export default class ComposedDocument extends Component{
	static displayName="composed"
	static propTypes={
		pages: PropTypes.arrayOf(PropTypes.object).isRequired,
		pageGap: PropTypes.number.isRequired,
		scale: PropTypes.number.isRequired,
	}

	static defaultProps={
		pageGap:24,
		scale:1,
	}

	static contextTypes={
		events: PropTypes.shape({emit:PropTypes.func.isRequired}),
	}

	getComposed=memoize((pages,pageGap)=>{
		const content=pages.map((page,i)=>page.render())
		return content.reduce((size,{props:{width,height}})=>{
				return Object.assign(size,{
					width:Math.max(size.width,width),
					height:size.height+height+pageGap,
				})
			},{width:0,height:pageGap,composed:content})
	})

	render(){
		const {pages, pageGap, scale, style,children,innerRef, content, precision=1, ...props}=this.props
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
