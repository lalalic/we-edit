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
								<text>page: {i}</text>
								<Page {...page} {...{onPageHide, onPageShow}}/>
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

	static contentY(pages, pgGap){
		return pages.slice(0,pages.length-1)
			.reduce((w,{size:{height}})=>w+height+pgGap,(last=>{
				if(!last)
					return 0
				let lastColumnLines=last.columns[last.columns.length-1].children
				let lastLine=lastColumnLines[lastColumnLines.length-1]
				let height=last.margin.top
				if(lastLine)
					height+=lastLine.props.y+lastLine.props.height
				return height
			})(pages[pages.length-1]))
	}

	static pageY(pages,pgGap,which){
		return pages.slice(0,which)
			.reduce((h,{size:{height}})=>h+height+pgGap,-pgGap)
	}

	static contentAt(pages, pgGap, x, y){
		
	}

	static nextLine(pages,pgGap, x, y){

	}

	static prevLine(pages,gpGap,x,y){

	}
}
