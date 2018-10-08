import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import Base from "../paragraph"
import Text from "./text"
import ParagraphEnd from "./paragraph-end"
import editable from "./editable"

import {Text as ComposedText} from "../composed"

export default Cacheable(class Paragraph extends editable(Base,{stoppable:true}){
	constructor(){
		super(...arguments)
		this.computed.lastText=""
	}

	componentWillUnmount(){
		//this.emit("words", -this.computed.breakOpportunities.length)
	}

	clearComposed(){
		this.computed.lastText=""
		super.clearComposed(...arguments)
	}

	onAllChildrenComposed(){
		/*
		let lastLine=this.computed.composed.pop()
		if(!lastLine){
			this.availableSpace=this.context.parent.nextAvailableSpace({width:0.1})
			lastLine=this._newLine()
			this.computed.composed.push(lastLine)
		}
		const {height,descent}=this.getDefaultMeasure()
		lastLine.push(<ComposedText

				width={0.1}
				height={height}
				descent={descent}
				children={[this.constructor.End]}/>)
				*/
		super.onAllChildrenComposed()
	}

	getDefaultMeasure(){
		return new this.context.Measure(this.props.defaultStyle)
	}

	children(){
		return [
			...this.props.children,
			<ParagraphEnd {...this.props.defaultStyle}
				key="end"
				for={this.props.id}
				id={`${this.props.id}-end`}/>
		]
	}

	nextCursorable(at, locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 0
		}
		return super.nextCursorable(...arguments)
	}

	prevCursorable(at, locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 0
		}
		return super.nextCursorable(...arguments)
	}

	nextSelectable(at,locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 1
		}else if(at==-1){
			return 1
		}
		return super.nextSelectable(...arguments)
	}

	prevSelectable(at, locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 1
			else if(at===1){
				return 0
			}
		}else if(at===-1){
			return 0
		}
		return super.prevSelectable(...arguments)
	}
})
