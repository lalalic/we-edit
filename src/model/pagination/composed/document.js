import React, {PureComponent as Component, PropTypes} from "react"
import Group from "./group"
import Page from "./page"

export default class Document extends Component{
	static proptTypes={
		pages: PropTypes.arrayOf(PropTypes.element),
		width: PropTypes.number
	}
	static contextTypes={
		media:PropTypes.string,
		width:PropTypes.number,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	render(){
		let {width:containerWidth,pgGap,style}=this.context
		let {pages:pageInfos, width:contentWidth}=this.props
		let height=0, pages
		let viewBoxWidth=1
		let viewBoxHeight=1

		if(containerWidth==undefined){
			pages=pageInfos.map((page,i)=><Page {...page} key={i}/>)
			containerWidth=1
		}else{
			viewBoxWidth=Math.max(contentWidth+2*pgGap, containerWidth)
			let y=0
			pages=(
				<Group y={pgGap}>
				{
					pageInfos.map((page,i)=>{
						let newPage=(
							<Group y={y} x={(viewBoxWidth-page.size.width)/2} key={i}>
								<Page {...page}/>
							</Group>
						);
						y+=(page.size.height+pgGap)
						height+=(page.size.height+pgGap)
						return newPage
					})
				}
				</Group>
			)
			height+=pgGap
			viewBoxHeight=viewBoxWidth*height/containerWidth
		}
		return (
			<svg width={containerWidth} height={height}
				viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
				style={style}>
				{pages}
				{this.props.children}
			</svg>
		)
	}
}
