import React, {Component, PropTypes} from "react"

import Page from "./page"

export default class Document extends Component{
	render(){
		let i=1
		return (
			<svg width={1} height={1} viewBox={`0 0 1 1`}>
				{this.props.children}
				{
					this.props.sections.reduce((pages,section)=>{
						section.computed.composed
							.forEach(page=>pages.push(<Page {...page} key={i++}/>))
						return pages
					}, [])
				}        
			</svg>
			)
	}
}