import React, {Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"
import Page from "./page"
import Media from "../edit/media"

export default class ComposedDocument extends Component{
	static propTypes={
		pages: PropTypes.arrayOf(PropTypes.object).isRequired,
		pgGap: PropTypes.number.isRequired,
		scale: PropTypes.number.isRequired,
	}

	static defaultProps={
		pgGap:24,
	}

	static contextTypes={
		events: PropTypes.shape({emit:PropTypes.func.isRequired}),
	}

	render(){
		const {pages, pgGap, scale, canvas=<Dummy/>, style,children, svgRef, ...props}=this.props
		const {width,height}=pages.reduce((size,{size:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height+pgGap
				}
			},{width:0,height:pgGap})

		return   React.cloneElement(canvas,{content:
					<svg
						{...props}
						ref={svgRef}
						preserveAspectRatio="xMidYMin"
						viewBox={`0 0 ${width} ${height}`}
						style={{background:"transparent", width:width*scale, height:height*scale, ...style}}
						>
						<Media {...{pgGap, width}}>
							{pages.map((page,i)=><Page {...page} key={i} i={i}/>)}
						</Media>
						{children}
					</svg>
				})

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
}

const Dummy=({content})=>content
