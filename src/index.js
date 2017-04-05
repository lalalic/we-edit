import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import {Editor, Viewer, Pagination, Html} from "component"

import Input from "input"

import Docx from "input/docx"

Input.support(Docx)

export function edit(input,container){
	ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>{
			ReactDOM.render((
				<doc.Store>
					<div className="editors">
						<Editor>
							<Pagination/>
						</Editor>
					</div>
				</doc.Store>
			), container)
			return doc
		})
}

export function create(container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.create()
        .then(doc=>{
			ReactDOM.render((
				<doc.Store>
					<div className="editors">
						<Editor>
							<Pagination/>
						</Editor>
					</div>
				</doc.Store>
			), container)
			return doc
		})
}

export function preview(input,container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render((
			<doc.Store>
				<Viewer>
					<Pagination/>
				</Viewer>
			</doc.Store>
		), container))
}

export function compose(input){
	Content.Text.WordWrapper=NodeWordWrapper
	return Input.load(input)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}