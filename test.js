import React from "react"
import ReactDOM from "react-dom"

import {combineReducers} from "redux"
import {Provider} from "react-redux"
import {createStore} from "state"

import {Editor, Viewer, Pagination, Html, WeEdit,WithStore} from "component"
import fonts from "fonts"
import Input from "input"

import NodeWordWrapper from "wordwrap/node"
import {Text} from "pagination"
Text.WordWrapper=NodeWordWrapper

import Docx from "we-edit-docx"
import Native from "input/native"
Input.support(Docx, Native)

import * as UI from "we-edit-ui"

function editor(){
	window.addEventListener("load", function(){
		let container=document.querySelector("#app")
		ReactDOM.render((
			<WeEdit>
				<UI.Workspace>
					<Editor width={600}>
						<Pagination/>
					</Editor>
				</UI.Workspace>
			</WeEdit>
		), container)
	})
}

function edit(input){
	let container=document.createElement("div")
	document.querySelector("#app").appendChild(container)
	return Input.load(input)
		.then(doc=>{
			let docEl=(
				<doc.Store>
					<Editor width={600}>
						<Pagination/>
					</Editor>
				</doc.Store>
			)
			return ReactDOM.render(docEl, container)
			/*
			let {state,reducer}=doc.initState()
			let store=createStore({
					WeEdit:state
				},
				combineReducers({
					WeEdit:reducer
				})
			)
			
			ReactDOM.render((
				<Provider store={store}>
					<withStore key="WeEdit">
					{docEl}
					</withStore>
				</Provider>
			), container)
			return doc
			*/
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

//editor()