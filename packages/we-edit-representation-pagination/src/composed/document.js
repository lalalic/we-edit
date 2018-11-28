import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Group from "./group"
import Media from "./media"

export default class ComposedDocument extends Component{
	static propTypes={
		pages: PropTypes.arrayOf(PropTypes.object).isRequired,
		pgGap: PropTypes.number.isRequired,
		scale: PropTypes.number.isRequired,
	}

	static defaultProps={
		pgGap:24,
		scale:1,
	}

	static contextTypes={
		events: PropTypes.shape({emit:PropTypes.func.isRequired}),
	}

	getSize=memoize((pages,pgGap)=>{
		return pages.reduce((size,{props:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height+pgGap
				}
			},{width:0,height:pgGap})
	})

	render(){
		const {pages, pgGap, scale, style,children,innerRef, content, precision=1, ...props}=this.props
		const {width,height}=this.getSize(pages, pgGap)

		return   (
			<svg
				{...props}
				ref={innerRef}
				preserveAspectRatio="xMidYMin"
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"transparent", width:width*scale/precision, height:height*scale/precision, ...style}}
				>
				<Media {...{pgGap:pgGap*precision, width,precision}}>
					{pages.map((page,i)=>page.createComposed2Parent(<Group className="page"/>))}
				</Media>
				{children}
			</svg>
		)
	}
}
