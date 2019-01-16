import React, {Component} from "react"
import PropTypes from "prop-types"
import {models, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {HasParentAndChild, Fissionable} from "./composable"
import {Group} from "./composed"

const Super=HasParentAndChild(models.Table)
/*
export default class Table extends Super{
	nextAvailableSpace(){
		let availableSpace=this.context.parent.nextAvailableSpace(...arguments)
		return {...availableSpace, width: this.props.width}
	}

	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height}>
				{React.cloneElement(row,{x:this.props.indent})}
			</Group>
		)
	}
}
*/
const Super=Fissionable(HasParentAndChild(models.Table))
export default class Table extends Super{
	static defaultProps={
		...Super.defaultProps,
		create(){
			return new Table.Frame(...arguments)
		}
	}
	constructor(){
		super(...arguments)
		if(!Table.Frame){
			Table.Frame=class extends this.Frame{
				
			}
		}
	}
	
	create(props={},context={},required){
		if(this.computed.composed.length>0){
			if(this.current.isEmpty()){
				this.computed.composed.pop()
			}else{
				this.context.parent.appendComposed(this.createComposed2Parent())
			}
		}
		const {height}=this.context.parent.nextAvailableSpace(required)
		const {width}=this.props
		return super.create({width,height})
	}
	
	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		const {border, margin, spacing, background,vertAlign}=this.props
		const contentHeight=this.current.currentY
		const height=contentHeight+this.nonContentHeight
		const width=this.current.props.width+margin.left+margin.right
		return (
			<ComposedCell {...{
				border, margin, spacing, background,vertAlign,width,
				nonContentHeight:this.nonContentHeight,
				frame:this.current
			}}/>
		)
	}
}