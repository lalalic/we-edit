import React from "react"
import ReactDOM from "react-dom"

import {edit,create,preview,compose} from "we-edit"
import {Editor,Pagination,Html,Plain,WeEdit} from "we-edit/component"

import WeEditUI, {Workspace, Bare} from "we-edit-ui"
import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import Input from "we-edit/input"
import Docx from "we-edit-docx"
Input.support(Docx)


function editor(){
	window.addEventListener("load", function(){
		ReactDOM.render((
			<WeEdit>
				<WeEditUI style={{width:1200}}>
					<Workspace filter="*.docx">
						<Editor width={1200}>
							<Pagination fonts="fonts/" measure={SVGMeasure}/>
						</Editor>
					</Workspace>
					<Bare>
						<Editor width={600}>
							<Pagination fonts="fonts/" measure={FontMeasure}/>
						</Editor>
					</Bare>
				</WeEditUI>
			</WeEdit>
		), document.querySelector("#app"))
	})
}

function testDocx(){
	fetch("basic.docx").then(res=>res.blob()).then(docx=>{
		docx.name="basic.docx"
		edit(docx,document.querySelector("#app"))
	})
}

function testNative(){
	fetch("basic.wed.json").then(res=>res.json()).then(doc=>{
		edit(doc,document.querySelector("#app"))
	})
}

//testNative()
//testDocx()

editor()
