import React, {PureComponent as Component, PropTypes} from "react"
import Group from "./group"
import Page from "./page"
import Query from "./query"

export default class Document extends Component{
	static proptTypes={
		pages: PropTypes.arrayOf(PropTypes.element),
		width: PropTypes.number
	}
	static contextTypes={
		media:PropTypes.string,
		viewport:PropTypes.any,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	render(){
		let {viewport,pgGap,style,media}=this.context
		let {pages:pageInfos, width:contentWidth, minHeight=0,onPageHide, onPageShow,...others}=this.props
		let pages
		let viewBoxWidth=1, viewBoxHeight=1

		if(media=="print"){
			pages=pageInfos.map((page,i)=><Page {...page} key={i}/>)
		}else{
			viewBoxWidth=Math.max(contentWidth+2*pgGap, viewport.width)
			let y=0
			pages=(
				<Group y={pgGap}>
				{
					pageInfos.map((page,i)=>{
						let newPage=(
							<Group y={y} x={(viewBoxWidth-page.size.width)/2} key={i}>
								<Page {...page} {...{onPageHide, onPageShow,i}}/>
							</Group>
						);
						y+=(page.size.height+pgGap)
						return newPage
					})
				}
				</Group>
			)
			y+=pgGap
			if(minHeight>y)
				y=minHeight
			viewBoxHeight=y
		}
		return (
			<svg {...others}
				width={viewport.width} height={parseInt(viewport.width*viewBoxHeight/viewBoxWidth)}
				viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
				style={style}>
				{pages}
				{this.props.children}
			</svg>
		)
	}

	static Query=Query
}
