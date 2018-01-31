import React from "react"
import ReactDOM from "react-dom"

import {edit,create,preview,compose} from "we-edit"
import Input from "we-edit/input"
import {Editor,Pagination,Html,Plain,WeEdit} from "we-edit/component"
import fonts from "fonts"

import WeEditUI, {Workspace, Bare} from "we-edit-ui"
import {FontMeasure} from "wordwrap/measure"

import Docx from "we-edit-docx"
Input.support(Docx)


function editor(){
	window.addEventListener("load", function(){
		fonts.load("fonts/verdana.ttf", "verdana").then(()=>{
			let container=document.querySelector("#app")
			ReactDOM.render((
				<WeEdit>
					<WeEditUI>
						<Workspace filter="*.docx">
							<Editor>
								<Pagination measure={FontMeasure}/>
							</Editor>
						</Workspace>
						<Bare>
							<Editor width={600}>
								<Pagination measure={FontMeasure}/>
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
		fonts.load("fonts/verdana.ttf", "verdana")
		.then(()=>edit(docx,container).then(a=>window.doc=a))
	})
}

function testNative(){
	fetch("basic.wed.json").then(res=>res.json()).then(doc=>{
		let container=document.createElement("div")
		document.querySelector("#app").appendChild(container)
		fonts.load("fonts/verdana.ttf", "verdana")
			.then(()=>edit(doc,container).then(a=>window.doc=a))
	})
}

//testNative()
testDocx()

//editor()
