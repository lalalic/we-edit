import React, {Fragment} from "react"
import {WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"
import {compose,setDisplayName,setStatic}  from "recompose"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"
import Ribbon, {Tab} from "./ribbon"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"

const Default={
	workspaces:[
		<Workspace 
			accept="*.*"
			key="*"
			layout="print"
			toolBar={
				<Ribbon>
					<Tab label="Developer"/>
				</Ribbon>
			}
			>
			<Viewer
				toolBar={null} 
				ruler={false}
				layout="read" 
				icon={<IconRead/>}
				representation={<Representation type="pagination"/>}
				/>
			<Editor
				layout="print" 
				icon={<IconPrint/>}
				representation={<Representation type="pagination"/>}
				/>
		</Workspace>
	]
}

var myOffice=[Default]

export default compose(
		setDisplayName("Office"),
		setStatic("install", function install(office1){
			myOffice=[...myOffice, office1]
		}),
		
		setStatic("uninstall", function uninstall(office1){
			myOffice=myOffice.filter(a=>a!=office1)
		})
	)(({
        titleBarProps,
        fonts=["Arial", "Calibri", "Cambria"],
		children,
		_myOffice=myOffice.reduce((merged,a)=>({...merged, ...a, workspaces:[...a.workspaces, ...merged.workspaces]},{})),
		titleBar=_myOffice.titleBar,
		dashboard=_myOffice.dashboard,
		workspaces=_myOffice.workspaces,
    })=>(
    <WeEdit>
        <WeEditUI {...{titleBarProps, fonts, titleBar,dashboard}}>
			{workspaces}
			{children}
        </WeEditUI>
    </WeEdit>
))

