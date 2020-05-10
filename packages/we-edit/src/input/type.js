import React from "react"
import PropTypes from "prop-types"

import uuid from "../tools/uuid"
import Reducer from "./reducer"

import {getSelection} from "../state/selector"
import {selection} from "../state/reducer"

export class Viewable{
	static get isWeEditType(){
		return true
	}

	static support(file){
		return false
	}

	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		mimeType: PropTypes.string.isRequired
	}

	static getType(){
		return this.defaultProps.type
	}

	static getTypeName(){
		return this.defaultProps.name
	}

	static getTypeExt(){
		return this.defaultProps.ext
	}

	static getTypeMimeType(){
		return this.defaultProps.mimeType
	}

	get name(){
		return this.props && this.props.name
	}

	get type(){
		return this.getType()
	}

	get typeName(){
		return this.getTypeName()
	}

	get typeExt(){
		return this.getTypeExt()
	}

	get mimeType(){
		return this.getTypeMimeType()
	}

	getType(){
		return this.constructor.getType()
	}

	getTypeName(){
		return this.constructor.getTypeName()
	}

	getTypeExt(){
		return this.constructor.getTypeExt()
	}

	getTypeMimeType(){
		return this.constructor.getTypeMimeType()
	}

	isTypeOf(InputType){
		return this instanceof InputType
	}

	editable(){
		return false
	}

	//////////////////

	makeId(node, rootId, nodeId){
		return uuid()
	}

	//doc=null//injected from load/create
	parse({data/*stream,array,object,...*/,...props}){
		return Promise.reject(new Error("need implementation to parse file {data}"))
	}

	release(){

	}

	/**
	* a higher-order component to transform basic components to your typed components
	* components may be model/html, model/pagination, model/pagination/edit depending on
	* outer component[editor, html, viewer, pagination, plain]
	*/
	transform(components){
		if(this.constructor.HOCs){
			const HOCs=this.constructor.HOCs
			return Object.keys(HOCs).reduce((transformed,k)=>{
				transformed[k]=HOCs[k](components)
				return transformed
			},{...components})
		}
		return {...components}
	}

	/**
	* render a loaded/created doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(createElement/*(TYPE, props, children, rawcontent)*/,models){
		return "Input.render should be implemented"
	}

	/**
	* []: the fonts array that loaded/created doc uses
	* it's only for <Pagination measure={FontMeasure}/> type
	* it will be called when rendering for pagination output
	* usually you can collect it during render function
	*/
	getFontList(){
		return []
	}
}

export class Editable extends Viewable{
	static createStyles(){
		return {}
	}

	static  EventHandler=Reducer

	editable(){
		return true
	}

	stream(option){
		throw new Error("not support")
	}

	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/,models){

	}


	startTransaction(){
		if(this.doc.startTransaction){
			return this.doc.startTransaction(...arguments)
		}
	}

	commit(){
		if(this.doc.commit){
			return this.doc.commit(...arguments)
		}
	}

	rollback(){
		if(this.doc.rollback){
			this.doc.rollback(...arguments)
		}
	}

	/**
	*return:
	- false: no state change
	- {
		selection: change of selection,
		updated: updated content,
		undoables: saved changed content for history
	}: all these changes will be applied on state
	- any else: reduce selection action
	*/
	onChange(state,action){
		const {type,payload}=action
		const params=[state]
		const reducer=new this.constructor.Reducer(...params)
		switch(type){
			case `we-edit/init`:
				reducer.init(payload)
				break
			case `we-edit/text/TYPE`:
				reducer.type(payload)
				break
			case `we-edit/text/DELETE`:
				reducer.delete(payload)
				break
			case `we-edit/text/BACKSPACE`:
				reducer.backspace(payload)
				break
			case `we-edit/text/TAB`:
				reducer.tab(payload)
				break
			case `we-edit/text/ENTER`:
				reducer.enter(payload)
				break
			case "we-edit/entity/CREATE":
				reducer.create(payload)
				break
			case "we-edit/entity/UPDATE":
				reducer.update(payload)
				break
			case `we-edit/selection/UPDATE`:
				reducer.update(payload)
				break
			case 'we-edit/selection/COPY':
				reducer.copy(payload)
				break
			case 'we-edit/selection/PASTE':
				reducer.paste(payload)
				break
			case 'we-edit/selection/CUT':
				reducer.cut(payload)
				break
			case "we-edit/selection/MOVE":
				reducer.move(payload)
				break
			case "we-edit/selection/REMOVE":
				reducer.remove(payload)
				break
			case "we-edit/selection/EXTEND":
				reducer.extend(payload)
				break
			case "we-edit/history/UNDO":
				reducer.undo(payload)
				break
			case "we-edit/cursor/FORWARD":
				reducer.forward(payload)
				break
			case "we-edit/cursor/BACKWARD":
				reducer.backward(payload)
				break
			case "we-edit/selection/SELECTED":
			case "we-edit/selection/STARTEDAT":
				const {start, end, cursorAt}=selection(getSelection(state),action)
				reducer.cursorAt(start.id, start.at, end.id, end.at, cursorAt)
				break
			default:
				return true
		}
		return reducer.state()
	}
}

export default Editable
