import React from "react"
import {WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"
import IconWeb from "material-ui/svg-icons/av/web"

export default ({
        title,
        accept="*.docx",
        fonts=["Arial", "Calibri", "Cambria"],
    })=>(
    <WeEdit>
        <WeEditUI title={title} fonts={fonts}>
            <Workspace accept={accept} layout="print" debug={false}>
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
                </Editor>

                <Editor ruler={false}
                    layout="web" icon={<IconWeb/>}
                    representation={<Representation type="html"/>}>

                </Editor>
            </Workspace>
        </WeEditUI>
    </WeEdit>
)
