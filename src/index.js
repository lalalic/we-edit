if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr="") {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import {Editor, Composer, Viewer, Pagination, Html} from "component"

import Input from "./input"

export function edit(input,container){
	ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render((
			<doc.Store>
				<div className="editors">
					<Editor>
						<Pagination/>
					</Editor>
				</div>
			</doc.Store>
		), container))
}

export function preview(input,container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render((
			<doc.Store>
				<Viewer>
					<Pagination/>
				</Viewer>
				<Viewer>
					<Html/>
				</Viewer>
			</doc.Store>
		), container))
}

export function compose(input){
	Content.Text.WordWrapper=NodeWordWrapper
	return Input.load(input)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}

export function create(container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.create()
        .then(doc=>ReactDOM.render(doc,container))
}
