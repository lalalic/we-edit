import React from "react"
import {WeEdit, Viewer, Editor} from "we-edit/components"
import Pagination from "we-edit-channel-pagination"
import Html from "we-edit-channel-html"

import {} from "we-edit-type-docx"
import {} from "we-edit-type-json"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"
import IconWeb from "material-ui/svg-icons/av/web"


export const Office=()=>(
    <WeEdit>
        <WeEditUI fonts={["Arial", "Calibri", "Cambria"]}>
            <Workspace accept="*.docx" layout="print" debug={false}>
                <Viewer
                    toolBar={null} ruler={false}
                    layout="read" icon={<IconRead/>}
                    channel={<Pagination/>}>

                </Viewer>

                <Editor
                    layout="print" icon={<IconPrint/>}
                    channel={<Pagination/>}>

                </Editor>

                <Editor ruler={false}
                    layout="web" icon={<IconWeb/>}
                    channel={<Html/>}>

                </Editor>
            </Workspace>
        </WeEditUI>
    </WeEdit>
)

import ReactDOM from "react-dom"
export function createOffice(container){
	if(!container){
		container=document.createElement("div")
		document.body.style="margin:0px;padding:0px;border:0px"
		document.body.appendChild(container)
	}
	window.addEventListener("load",()=>{
		ReactDOM.render(<Office/>, container)
	})
}

export default Office

createOffice()

