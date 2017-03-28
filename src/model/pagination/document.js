import React, {Children, Component, PropTypes} from "react"

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
					width={this.contentWidth}
					sections={this.computed.children}/>
			</div>
		)
    }

	get contentWidth(){
		return Children.toArray(this.props.children)
			.reduce((w,{props:{pgSz:{width}}})=>Math.max(w,width),0)
	}

	compose(){

	}

	get composed(){
		return this.refs.composed
	}

	static Composed=class extends Component{
        static displayName="composed-document"
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
