import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

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
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	render(){
		let {pgGap,style,media}=this.context
		let {pages:pageInfos, onPageHide, onPageShow,...others}=this.props
		let pages
		let {width,height}=pageInfos.reduce((size,{size:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height
				}
			},{width:0,height:pgGap})

		if(media=="print"){
			pages=pageInfos.map((page,i)=><Page {...page} key={i}/>)
		}else{
			let y=0
			pages=(
				<Group y={pgGap} x={0}>
				{
					pageInfos.map((page,i)=>{
						let newPage=(
							<Group y={y} x={(width-page.size.width)/2} key={i}>
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
		}
		return (
			<svg {...others}
				viewBox={`0 0 ${width} ${height}`}
				style={{...style, margin:"auto", width, height}}>
				{pages}
				{this.props.children}
			</svg>
		)
	}

	static Query=Query
}
