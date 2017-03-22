import React, {Component, PropTypes} from "react"

import {HasChild} from "./composable"
import Base from "../document"

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				<this.constructor.Composed ref="composed" 
					width={this.props.children.reduce((w,{props:{pgSz:{width}}})=>Math.max(w,width),0)}
					sections={this.computed.children}/>
			</div>
		)
    }
	
	compose(){
		
	}
	
	get composed(){
		return this.refs.composed
	}
	
	static Composed=class extends Component{
		render(){
			const {sections, width}=this.props
			return (
				<ComposedDocument width={width} pages={
					sections.reduce((pages,section)=>{
						section.computed.composed.forEach(page=>pages.push(page))
						return pages
					},[])
				}/>
			)
		}
	}
}


