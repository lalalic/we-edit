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
				<this.constructor.Composed ref="composed" sections={this.computed.children}/>
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
			const {sections}=this.props
			return (
				<ComposedDocument pages={
					sections.reduce((pages,section)=>{
						section.computed.composed.forEach(page=>pages.push(page))
						return pages
					},[])
				}/>
			)
		}
	}
}


