import React from "react"
import ReactDOMServer from "react-dom/server"
import ReactDOM from "react-dom"

import {Editor, Viewer, Pagination, WeEdit} from "components"
import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import Native from "input/native"
import Input from "input"
Input.support(Native)

export function compose(file){
	return Input.load(file)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}

export function edit(doc, container, editor=(<Editor canvasStyle={{width:"80%"}} channel={<Pagination measure={SVGMeasure}/>} />)){
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

export function create(type, container, editor=(<Editor channel={<Pagination measure={SVGMeasure}/>} />)){
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

export function preview(doc, container, viewer=((<Viewer channel={<Pagination measure={SVGMeasure}/>} />))){
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

export {ACTION, getActive} from "components/we-edit"
import * as selector from "state/selector"
export {selector}
