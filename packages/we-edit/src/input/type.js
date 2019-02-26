import React from "react"
import PropTypes from "prop-types"

import {default as Reducer} from "./reducer"
var i=0

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

	makeId(node){
		return i++
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
	transform(models){
		return models
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

	static  Reducer=Reducer

	editable(){
		return true
	}

	stream(option){
		throw new Error("not support")
	}

	makeId(content){
		throw new Error("make your own uuid")
	}

	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/,models){

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
	onChange(state,{type,payload}){
		const params=[state]
		const reducer=new this.constructor.Reducer(...params)
		switch(type){
			case `we-edit/text/RETURN`:
				return reducer.insert("\r").state()
			case `we-edit/text/INSERT`:
				return reducer.insert(payload).state()
			case `we-edit/text/REMOVE`:
				return reducer.remove(payload).state()
			case "we-edit/entity/CREATE":
				return reducer.create(payload).state()
			case "we-edit/entity/UPDATE":
				return reducer.update(payload).state()
			case `we-edit/selection/UPDATE`:
				return reducer.update(payload).state()
			case 'we-edit/selection/COPY':
				return reducer.copy(payload).state()
			case 'we-edit/selection/PASTE':
				return reducer.paste(payload).state()
			case 'we-edit/selection/CUT':
				return reducer.cut(payload).state()
			case "we-edit/selection/MOVE":
				return reducer.move(payload).state()
			case "we-edit/history/UNDO":
				return reducer.undo(payload).state()
			case "we-edit/history/REDO":
				return reducer.redo(payload).state()
		}
		return true
	}
}

export class Serializable extends Editable{
	/*find node by id*/
	getNode(id){

	}

	//always attached
	cloneNode(element, keepId=false){

	}

	//return [/*cursor at first part*/{id,at},/*cursor at second part*/{id,at}]
	splitNode(element,at, firstKeepId=true){

	}

	/*
	at=0:before node{id},
	at=1:after node{id},
	create and attached when poisiton is falsy
	*/
	createNode(element, position/*{id,at=0}*/){

	}

	updateNode(element, changing){

	}

	removeNode(element){

	}

	/*append when referenceNode is falsy */
	insertNodeBefore(newNode,referenceNode,parentNode){

	}
	//prepend when referenceNode is falsy
	insertNodeAfter(newNode,referenceNode,parentNode){

	}

	//return constructed node
	//fromId==toId should be supported
	construct(fromId,toId){

	}

	toString(id){
		return `[${id}]`
	}
}

export default Editable
