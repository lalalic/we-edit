import React from "react"
import {WeEdit, Viewer, Editor, Emitter, Stream} from "we-edit"

import Pagination from "we-edit-view-pagination"
import Html from "we-edit-view-html"
import Text from "we-edit-view-text"
/*
import "we-edit-input-docx"
import "we-edit-input-json"

import "we-edit-output-pdf"
import "we-edit-output-html"
import "we-edit-output-svg"
import "we-edit-output-input"
*/

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
                    view={<Pagination/>}>

                </Viewer>

                <Editor
                    layout="print"
					icon={<IconPrint/>}
                    view={<Pagination/>}
					>

                </Editor>

                <Editor ruler={false}
                    layout="web" icon={<IconWeb/>}
                    view={<Html/>}>

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
export {Pagination, Html, Text}

import * as weedit from "we-edit"
export {weedit}

(function(me){
	window.addEventListener("load", ()=>{
		let container=document.querySelector('#OfficeContainer')
		if(container || process.env.NODE_ENV!=="production")
			create(container)
	})
})(window);
