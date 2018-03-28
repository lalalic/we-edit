import React from "react"
import {WeEdit, Viewer, Editor, Stream} from "we-edit"

import Pagination from "we-edit-channel-pagination"

import Html from "we-edit-channel-html"
import Text from "we-edit-channel-text"

import "we-edit-input-docx"
import "we-edit-input-json"

import "we-edit-output-pdf"
import "we-edit-output-html"
import SVG from "we-edit-output-svg"
import "we-edit-output-input"

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
                    layout="print"
					icon={<IconPrint/>}
                    channel={<Pagination/>}
					>

                </Editor>

                <Editor ruler={false}
                    layout="web" icon={<IconWeb/>}
                    channel={<Html/>}>

                </Editor>
				
				<Emitter channel={<Pagination/>}>
					<Stream path="./a.svg">
						<SVG/>
					</Stream>
				</Emitter>
            </Workspace>
        </WeEditUI>
    </WeEdit>
)

import ReactDOM from "react-dom"
export function createOffice(container){
	if(!container || container==document.body){
		container=document.createElement("div")
		document.body.style="margin:0px;padding:0px;border:0px"
		document.body.appendChild(container)
	}
	return ReactDOM.render(<Office/>, container)
}

export default Office;

(function(me){
	window.addEventListener("load", ()=>{
		let container=document.querySelector('#OfficeContainer')
		if(container || process.env.NODE_ENV!=="production")
			createOffice(container)
	})
})(window);
