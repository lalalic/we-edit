import React, {Component, Fragment} from "react"
import ReactDOM from "react-dom"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"
import IconWeb from "material-ui/svg-icons/av/web"

import {edit,create,preview,compose} from "we-edit"
import {Editor,Viewer,Pagination,Html,Plain,WeEdit} from "we-edit/components"

import WeEditUI, {Workspace, Bare} from "we-edit-ui"
import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import Input from "we-edit/input"
import Docx from "we-edit-docx"
Input.support(Docx)

function editor(){
	window.addEventListener("load", function(){
		ReactDOM.render((
			<WeEdit>
				<WeEditUI>
					<Workspace accept="*.docx" layout="print" debug={true}>
						<Viewer
							toolBar={null} ruler={false}
							layout="read" icon={<IconRead/>}
							channel={<Pagination fonts="fonts/" measure={SVGMeasure}/>}>

						</Viewer>

						<Editor
							
							layout="print" icon={<IconPrint/>}
							channel={<Pagination fonts="fonts/" measure={SVGMeasure}/>}>

						</Editor>

						<Editor ruler={false}
							layout="web" icon={<IconWeb/>}
							channel={<Html/>}>

						</Editor>
					</Workspace>
					<Workspace toolBar={null} statusBar={null} ruler={false}>
						<Editor channel={<Pagination fonts="fonts/" measure={FontMeasure}/>}/>
					</Workspace>
				</WeEditUI>
			</WeEdit>
		), document.querySelector("#app"))
	})
}

function testDocx(){
	fetch("basic.docx").then(res=>res.blob()).then(docx=>{
		docx.name="basic.docx"
		document.querySelector("#app").style="width:500px;height:500px;overflow-y:scroll;text-align:center"
		edit(docx,document.querySelector("#app"))
	})
}

function testNative(){
	fetch("basic.wed.json").then(res=>res.json()).then(doc=>{
		document.querySelector("#app").style="width:400px;height:400px;position:absolute;"
		edit(doc,document.querySelector("#app"))
	})
}

//testNative()
//testDocx()

editor()
