import React from "react"
import PropTypes from "prop-types"
import {getSelection, ACTION} from "we-edit"

import Base from "../document"
import Responsible from "../../composed/responsible-canvas"

const Super=Base//editable(Base,{continuable:true})
export default class Document extends Super{
	static defaultProps={
		...Super.defaultProps,
		canvas:<Responsible/>,
	}
	static contextTypes={
		...Super.contextTypes,
		activeDocStore: PropTypes.any,
	}

	static Responsible=Responsible

	static getDerivedStateFromProps({content,viewport},state){
		if(content && !content.equals(state.content)){
			return {
				content,
				mode:"content",
				y:0,
				viewport
			}
		}
		return {viewport}
	}

	constructor(){
		super(...arguments)
		this.state={mode:"content", ...this.state}
	}
	
	get dispatch(){
		return this.context.activeDocStore.dispatch
	}

	compose4Scroll(y){
		this.setState({mode:"scroll",y})
	}

	compose4Selection(selection){
		this.setState({mode:"selection",selection})
	}

	isSelectionComposed(selection){
		const {end,start}=selection||getSelection(this.context.activeDocStore.getState())
		return !start.id ? true :
			this.composers.has(start.id) && this.getComposer(start.id).isAllChildrenComposed() &&
			this.composers.has(end.id) && this.getComposer(end.id).isAllChildrenComposed()
	}
}
