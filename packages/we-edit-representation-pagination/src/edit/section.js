import React, {Fragment,Children} from "react"
import PropTypes from "prop-types"

import Base from "../section"

import recomposable from "./recomposable"

const Super=recomposable(Base)

export default class Section extends Super{
	constructor(){
		super(...arguments)
		this.computed.lastComposed=[]
	}
	
	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		let last=this.computed.composed[this.computed.composed.length-1]
		last && (last.lastSectionPage=true);
	}

	createComposed2Parent(){
		const {pgSz:size,  pgMar:margin}=this.props
		const page=React.cloneElement(super.createComposed2Parent(...arguments),{
				"width":size.width-margin.left-margin.right
			})
		this.computed.lastComposed.push(page)
		return page
	}

	render(){
		const {shouldRemoveComposed,parent}=this.context
		const {changed}=this.props

		if(this.computed.lastComposed.length>0){
			if(shouldRemoveComposed() && changed){
				this.computed.lastComposed=[]
			}else{
				this.computed.lastComposed.forEach(page=>parent.appendComposed(page))
				return null
			}
		}
		
		return super.render()
	}
}
