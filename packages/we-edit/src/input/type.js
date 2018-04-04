import React from "react"
import * as reducer from "./reducer"
import Components from "../model"
import {getSelection, getContent} from "../state/selector"

export class Viewable{
	static get isWeEditType(){
		return true
	}

	static support(file){
		if(this.Support)
			return new this.Support().check(file)
		return false
	}

	static Support=class{
		isNode(){
			return typeof(process)!=="undefined"
		}

		check(file){
			switch(typeof(file)){
			case "string":

			break
			case "object":

			break
			default:
				return false
			}
		}

		load(file,type){

		}

		isFile(str){

		}

		isUrl(){

		}

		isContent(){

		}

		isObject(){

		}

		isBlob(){

		}

		isBuffer(){

		}

		isStream(){

		}

		fromFile(str){

		}

		fromUrl(str){

		}

		fromContent(str){

		}

		fromObject(obj){

		}

		fromBlob(file){

		}
	}

	static isBlob(file){
		return file.size
	}

	static load(file){
		return new Promise((resolve, reject)=>{
			var reader=new FileReader();
			reader.onload=e=>{
				resolve({
					data:e.target.result,
					type:file.type.split("/").pop(),
					name:file.name
				})
			}
			reader.readAsText(file);
		})

	}
	
	getType(){
		throw new Exception("You have to specify document type, such as docx")
	}
	
	getTypeName(){
		throw new Exception("You have to specify document type name, such as Word Document")
	}
	
	getTypeExt(){
		throw new Exception("You have to specify document type ext, such as docx")
	}
	
	getTypeMimeType(){
		throw new Exception("You have to specify document mime type, such as application/docx")
	}
	

	//doc=null//injected from load/create
	load(url){
		return Promise.reject(new Error("need implementation to load and parse content at "+url))
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

	create(){
		throw new Error("not support")
	}

	stream(option){
		throw new Error("not support")
	}

	makeId(content){
		throw new Error("make your own uuid")
	}

	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/){

	}

	renderUp(state, Transformed){
		const selection=getSelection(state)
		let {id,at}=selection[selection.cursorAt]
		let element=null
		while(id){
			let {type, props, parent}=getContent(state, id).toJS()
			let Type=Transformed[type[0].toUpperCase()+type.substr(1)]
			element=React.createElement(Type, {...props,key:id, children:[element]})
			id=parent
		}

		return element
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
