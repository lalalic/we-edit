import React from "react"
import PropTypes from "prop-types"
import {getSelection, ACTION} from "we-edit"

import Base from "../document"
import Responsible from "../../composed/responsible-canvas"

import {editable} from "../../composable"

const Super=editable(Base,{continuable:true})
export default class Document extends Super{
	static propTypes={
		...Super.propTypes,
		pageGap: PropTypes.number,
		screenBuffer: PropTypes.number
	}

	static defaultProps={
		...Super.defaultProps,
		pageGap:12,
		screenBuffer: 1,
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

	get bufferHeight(){
		return this.props.screenBuffer*this.state.viewport.height
	}

	clearComposed(){
        super.clearComposed(...arguments)
        this.computed.templates=[]
	}
	
	get dispatch(){
		return this.context.activeDocStore.dispatch
	}

	componentDidUpdate(){
		this.dispatch(ACTION.Statistics({
			pages:this.pages.length,
			allComposed:this.isAllChildrenComposed(),
			words: this.composedWords()
		}))
	}

	composedWords(){
		return Array.from(this.composers.values())
			.filter(a=>!!a)
			.reduce((words,a)=>words+=(a.computed.atoms ? a.computed.atoms.length : 0),0)
	}

	/**
	* 1. selection end
	* 2. viewport: viewporter.scrollTop+viewporter.height
	**/
	shouldContinueCompose(composer){
		const aboveViewableBottom=()=>{
			const {y=0,viewport:{height,node:{scrollTop}},mode}=this.state
			const composedY=this.composedY() * this.props.scale
			return composedY<Math.max(scrollTop,y)+height+this.bufferHeight
		}

		const should=aboveViewableBottom() || !this.isSelectionComposed()

		if(!should  && composer){
			this.notifyNotAllComposed(composer)
		}
		return should
	}

	composedY(){
		const {canvas:{type:Canvas}}=this.props
		return Canvas.composedY(this)
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
