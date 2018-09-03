import React from "react"
import PropTypes from "prop-types"

import * as reducer from "./reducer"
import Components from "../model"
import {getSelection, getContent} from "../state/selector"

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
		return components
	}

	/**
	* render a loaded/created doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(createElement/*(TYPE, props, children, rawcontent)*/,components){
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

	stream(option){
		throw new Error("not support")
	}

	makeId(content){
		throw new Error("make your own uuid")
	}

	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/){

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
	onChange(state,{type,payload},createElement){
		let params=[state]
		switch(type){
			case `we-edit/text/RETURN`:
				return new reducer.content(...params)
					.insert("\r")
					.state()
			case `we-edit/text/INSERT`:
				return new reducer.content(...params)
					.insert(payload)
					.state()
			case `we-edit/text/REMOVE`:
				return new reducer.content(...params)
					.remove(payload)
					.state()
			case `we-edit/content/update`:
				return new reducer.content(...params)
					.update(payload)
					.state()
			case "we-edit/entity/RESIZE":
				return new reducer.entity(...params)
					.resize(payload)
					.state()
			case "we-edit/entity/ROTATE":
				return new reducer.entity(...params)
					.rotate(payload)
					.state()
			case "we-edit/entity/CREATE":
				return new reducer.entity(...params)
					.create(payload)
					.state()
			case 'we-edit/selection/COPY':
				return new reducer.clipboard(...params)
					.copy(payload)
					.state()
			case 'we-edit/selection/PASTE':
				return new reducer.clipboard(...params)
					.paste(payload)
					.state()
			case 'we-edit/selection/CUT':
				return new reducer.clipboard(...params)
					.cut(payload)
					.state()
			case "we-edit/selection/MOVE":
				return new reducer.entity(...params)
					.move(payload)
					.state()
		}
		return true
	}
}

export default Editable
