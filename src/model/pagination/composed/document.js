import React, {PureComponent as Component, PropTypes} from "react"
import Group from "./group"
import Page from "./page"

export default class Document extends Component{
	static proptTypes={
		pages: PropTypes.arrayOf(PropTypes.element)
	}
	static contextTypes={
		width:PropTypes.number,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}
	
	render(){
		let {width,pgGap,style}=this.context
		let {pages:pageInfos}=this.props
		let height=0, pages
		
		if(width==undefined){
			pages=pageInfos.map((page,i)=><Page {...page} key={i}/>)
			width=height=1
		}else{
			let y=0
			pages=(
				<Group y={pgGap}>
				{
					pageInfos.map((page,i)=>{
						let newPage=(
							<Group y={y} x={(width-page.size.width)/2} key={i}>
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
		}
		return (
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
				{this.props.children}
				{pages}        
			</svg>
		)
	}
}