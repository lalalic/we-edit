import React, {Component, PropTypes} from "react"
import Group from "./group"
import Page from "./page"

export default class Document extends Component{
	static contextTypes={
		width:PropTypes.number,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}
	
	render(){
		let {width,pgGap,style}=this.context
		let height=0, pages
		
		if(width==undefined){
			pages=this.props.sections.reduce((pages,section,i)=>{
				section.computed.composed
					.forEach((page,j)=>pages.push(<Page {...page} key={i+j}/>))
				return pages
			}, [])
			width=height=1
		}else{
			pages=(
				<Group y={pgGap}>
				{
					this.props.sections.map((section,i,a,b,y=0)=>{
						return <Group y={height} key={i}>{
							section.computed.composed.map((page,j)=>{
								let newPage=(
									<Group y={y} x={(width-page.size.width)/2} key={j}>
										<Page {...page}/>
									</Group>
								);
								y+=(page.size.height+pgGap)
								height+=(page.size.height+pgGap)
								return newPage
							})
						}</Group>
					})
				}
				</Group>
			)
			height+=pgGap
		}
		return (
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
				{this.props.children}
				{pages}        
			</svg>
		)
	}
}