if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr="") {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

export {loadFont} from "./fonts"
import Content, {Text} from "./content"
import Editor from "./editor"

import SVGWordWrapper from "./wordwrap/svg"
import CanvasWordWrapper from "./wordwrap/canvas"
import NodeWordWrapper from "./wordwrap/node"

import Input from "./input"

//Editor.Text.WordWrapper=CanvasWordWrapper

export function edit(input,container){
	ReactDOM.unmountComponentAtNode(container)
	return Input.load(input, Editor)
		.then(doc=>ReactDOM.render(doc, container))
}

export function compose(input){
	Content.Text.WordWrapper=NodeWordWrapper
	return Input.load(input, Content)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc))
}

export function preview(input,container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.load(input, Content)
		.then(doc=>ReactDOM.render(doc, container))
}

export function create(container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.create()
        .then(doc=>ReactDOM.render(doc,container))
}
