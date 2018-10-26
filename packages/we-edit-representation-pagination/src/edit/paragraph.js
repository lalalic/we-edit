import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import Base from "../paragraph"
import Text from "./text"
import ParagraphEnd from "./paragraph-end"
import editable from "./editable"

import {Text as ComposedText} from "../composed"

const Paragraph=Cacheable(class extends editable(Base,{stoppable:true}){
	clearComposed(){
		this.computed.lastText=""
		this.computed.words=0
		super.clearComposed(...arguments)
	}

	getDefaultMeasure(){
		return new this.context.Measure(this.props.defaultStyle)
	}

	children(){
		return [
			...Children.toArray(this.props.children),
			<ParagraphEnd {...this.props.defaultStyle}
				key="end"
				id={`${this.props.id}-end`}
				/>
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

	distanceAt(){
		return 0
	}
})

Paragraph.propTypes.defaultStyle=PropTypes.object.isRequired

export default Paragraph
