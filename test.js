import React from "react"
import ReactDOM from "react-dom"

import {edit,create,preview,compose} from "we-edit"
import Input from "we-edit/input"
import {Editor,Pagination,Html,Plain,WeEdit} from "we-edit/component"
import fonts from "fonts"

import WeEditUI, {Workspace, Bare} from "we-edit-ui"
import NodeWordWrapper from "wordwrap/node"
import {Text} from "pagination"
Text.WordWrapper=NodeWordWrapper

import Docx from "we-edit-docx"
Input.support(Docx)


function editor(){
	window.addEventListener("load", function(){
		fonts.load("verdana.ttf", "verdana").then(()=>{
			let container=document.querySelector("#app")
			ReactDOM.render((
				<WeEdit>
					<WeEditUI>
						<Workspace filter="*.docx" type={Docx}>
							<Editor width={600}>
								<Pagination/>
							</Editor>
						</Workspace>
						<Bare>
							<Editor width={600}>
								<Pagination/>
							</Editor>
						</Bare>
					</WeEditUI>
				</WeEdit>
			), container)
		})
	})
}

Object.assign(window, {edit,create,preview,loadFont: fonts.fromBrowser})

function testDocx(){
	fetch("basic.docx").then(res=>res.blob()).then(docx=>{
		docx.name="basic.docx"
		let container=document.createElement("div")
		document.querySelector("#app").appendChild(container)
		fonts.load("verdana.ttf", "verdana")
		.then(()=>edit(docx,container).then(a=>window.doc=a))
	})
}

function testNative(){
	fetch("basic.wed.json").then(res=>res.json()).then(doc=>{
		let container=document.createElement("div")
		document.querySelector("#app").appendChild(container)
		fonts.load("verdana.ttf", "verdana")
			.then(()=>edit(doc,container).then(a=>window.doc=a))
	})
}

//testNative()
//testDocx()

editor()
