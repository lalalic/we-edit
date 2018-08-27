import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"
import Page from "./page"

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
		media:PropTypes.string,
		events: PropTypes.shape({emit:PropTypes.func.isRequired}),
	}

	render(){
		const {pages:pageInfos, pgGap, scale, canvas, style}=this.props
		const {media}=this.context
		const {width,height}=pageInfos.reduce((size,{size:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height+pgGap
				}
			},{width:0,height:pgGap})

		let pages
		if(media=="screen"){
			let y=0
			pages=(
				<Group y={pgGap} x={0}>
				{
					pageInfos.map((page,i)=>{
						let newPage=(
							<Group y={y} x={(width-page.size.width)/2} key={i}>
								<Page {...page} i={i}/>
							</Group>
						);
						y+=(page.size.height+pgGap)
						return newPage
					})
				}
				</Group>
			)
			y+=pgGap

		}else{
			pages=pageInfos.map((page,i)=><Page {...page} key={i}/>)
		}

		const content=(
			<svg
				preserveAspectRatio="xMidYMin"
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"transparent", width:width*scale, height:height*scale, ...style}}>
				{pages}
			</svg>
		)

		return   canvas ? React.cloneElement(canvas,{pages:pageInfos, pgGap, scale, content}) : content

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
