import React from "react"
import ReactDOMServer from "react-dom/server"
import ReactDOM from "react-dom"

import {Editor, Viewer, Pagination, WeEdit} from "component"

import Native from "input/native"
import Input from "input"
Input.support(Native)

export function compose(file){
	return Input.load(file)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}

export function edit(doc, container, editor=(<Editor><Pagination/></Editor>)){
	return Input.load(doc)
		.then(loaded=>{
			ReactDOM.render((
				<loaded.Store>
					{editor}
				</loaded.Store>
			), container)

			return loaded
		})
}

export function create(type, container, editor=(<Editor><Pagination/></Editor>)){
	return Input.create(type)
		.then(loaded=>{
			ReactDOM.render((
				<loaded.Store>
					{editor}
				</loaded.Store>
			), container)

			return loaded
		})
}

export function preview(doc, container, viewer=((<Viewer><Pagination/></Viewer>))){
	return Input.create(type)
		.then(loaded=>{
			ReactDOM.render((
				<loaded.Store>
					{editor}
				</loaded.Store>
			), container)

			return loaded
		})
}

export {ACTION, getActive} from "component/we-edit"
import * as selector from "state/selector"
export {selector}


