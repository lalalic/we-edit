import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"
import Page from "./page"
import Query from "./query"

export default class Document extends Component{
	static proptTypes={
		pages: PropTypes.arrayOf(PropTypes.element)
	}
	
	static contextTypes={
		media:PropTypes.string,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	render(){
		if(this.props.canvas)
			return React.cloneElement(canvas, {pages:pageInfo,...others})
		
		let {pgGap,style,media}=this.context
		let {pages:pageInfos,...others}=this.props
		
		let pages
		let {width,height}=pageInfos.reduce((size,{size:{width,height}})=>{
				return {
					width:Math.max(size.width,width),
					height:size.height+height
				}
			},{width:0,height:pgGap})

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
		
		return (
			<svg {...others}
				viewBox={`0 0 ${width} ${height}`}
				style={{background:"lightgray", margin:"auto", width, height}}>
				{pages}
				{this.props.children}
			</svg>
		)
	}

	static Query=Query
}
