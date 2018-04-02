import React, {Component} from "react"
import {WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"

import "we-edit-representation-pagination"
import "we-edit-representation-html"
import "we-edit-representation-text"

import "we-edit-input-docx"
import "we-edit-input-json"

import "we-edit-output-pdf"
import "we-edit-output-html"
import "we-edit-output-svg"
import "we-edit-output-input"

import "we-edit-stream-browser"


import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"
import IconWeb from "material-ui/svg-icons/av/web"

export const DefaultOffice=()=>(
    <WeEdit>
        <WeEditUI fonts={["Arial", "Calibri", "Cambria"]}>
            <Workspace accept="*.docx" layout="print" debug={false}>
                <Viewer
                    toolBar={null} ruler={false}
                    layout="read" icon={<IconRead/>}
                    representation={<Representation type="pagination"/>}>

                </Viewer>

                <Editor
                    layout="print"
					icon={<IconPrint/>}
                    representation={<Representation type="pagination"/>}
					>
					<Stream.Collection>
						<Stream type="browser" target="_blank">
							<Emitter.Format type="pdf"/>
						</Stream>
						<Stream type="browser" target="previewer2">
							<Emitter.Format type="svg"/>
						</Stream>
					</Stream.Collection>
                </Editor>

                <Editor ruler={false}
                    layout="web" icon={<IconWeb/>}
                    representation={<Representation type="html"/>}>

                </Editor>
            </Workspace>
        </WeEditUI>
    </WeEdit>
)

import ReactDOM from "react-dom"

export function create(container, office=<DefaultOffice/>){
	if(!container || container==document.body){
		container=document.createElement("div")
		document.body.style="margin:0px;padding:0px;border:0px"
		document.body.appendChild(container)
	}
	return ReactDOM.render(office, container)
}

export {ReactDOM, React}

import * as weedit from "we-edit"
export {weedit}

(function(me){
	window.addEventListener("load", ()=>{
		let container=document.querySelector('#OfficeContainer')
		if(container || process.env.NODE_ENV!=="production")
			create(container)
	})
})(window);
