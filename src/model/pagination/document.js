import React, {Component, PropTypes} from "react"

import {HasChild} from "./composable"
import Base from "../document"

import Page from "./composed/page"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
        
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				<Composed ref="composed" sections={this.computed.children}/>
			</div>
		)
    }
}

class Composed extends Component{
	render(){
		let i=1
		return (
		<svg width={1} height={1} viewBox={`0 0 1 1`}>
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
