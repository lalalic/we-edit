import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Group from "./group"
import Page from "./page"
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
		return pages.reduce((size,{size:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height+pgGap
				}
			},{width:0,height:pgGap})
	})

	render(){
		const {pages, pgGap, scale, style,children,innerRef, ...props}=this.props
		const {width,height}=this.getSize(pages, pgGap)

		return   (
			<svg
				{...props}
				ref={innerRef}
				preserveAspectRatio="xMidYMin"
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"transparent", width:width*scale, height:height*scale, ...style}}
				>
				<Media {...{pgGap, width}}>
					{pages.map((page,i)=><Page {...page} key={i} i={i}/>)}
				</Media>
				{children}
			</svg>
		)
	}

	componentWillMount(){
		this.emit("composed",this.props.pages.length)
	}

	componentDidMount(){
		this.emit("emitted",this.props.pages.length)
	}


	emit(){
		try{
			if(this.context.events)
				this.context.events.emit(...arguments)
		}catch(e){
			console.error(e)
		}
	}

	static composedY(pages,pgGap,scale=1){
		if(pages.length==0)
			return 0

		const lastPageHeight=(last=>{//@TODO: balanced column, last page of section
			if(last.lastSectionPage){
				return last.size.height
			}
			let lastColumnLines=last.columns[last.columns.length-1].children
			let lastLine=lastColumnLines[lastColumnLines.length-1]
			let height=last.margin.top
			if(lastLine)
				height+=lastLine.props.y+lastLine.props.height
			return height
		})(pages[pages.length-1])

		const Y=pages.slice(0,pages.length-1).reduce((w,{size:{height}})=>w+height+pgGap,lastPageHeight)
		return scale*Y
	}
}
