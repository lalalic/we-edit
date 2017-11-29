import React from "react"
import ReactDOM from "react-dom"

import {Editor, Viewer, Pagination, Html} from "component"
import fonts from "fonts"
import Input from "input"

import NodeWordWrapper from "wordwrap/node"
import {Text} from "pagination"
Text.WordWrapper=NodeWordWrapper

function edit(input){
	let container=document.createElement("div")
	document.querySelector("#app").appendChild(container)
	return Input.load(input)
		.then(doc=>{
			ReactDOM.render((
				<doc.Store>
					<Editor width={600}>
						<Pagination/>
					</Editor>
				</doc.Store>
			), container)
			return doc
		})
}

function create(){
    let container=document.createElement("div")
	document.querySelector("#app").appendChild(container)
	return Input.create()
        .then(doc=>{
			ReactDOM.render((
				<doc.Store>
					<Editor>
						<Pagination/>
					</Editor>
				</doc.Store>
			), container)
			return doc
		})
}

function preview(input){
    let container=document.createElement("div")
	document.querySelector("#app").appendChild(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render((
			<doc.Store>
				<Viewer>
					<Pagination/>
				</Viewer>
			</doc.Store>
		), container))
}

Object.assign(window, {edit,preview,loadFont: fonts.fromBrowser})

Input.support(require("./src/docx"),require("./src/input/native"))

function testDocx(){
	fetch("basic.docx").then(res=>res.blob()).then(docx=>{
		docx.name="basic.docx"
		fonts.load("verdana.ttf", "verdana")
		.then(()=>edit(docx).then(a=>window.doc=a))
	})
}

function testNative(){
	fetch("basic.wed.json").then(res=>res.json()).then(doc=>{
		fonts.load("verdana.ttf", "verdana")
		.then(()=>edit(doc).then(a=>window.doc=a))
	})
}

//testNative()
testDocx()