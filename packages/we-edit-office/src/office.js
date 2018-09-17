import React, {Fragment} from "react"

import {DOMAIN, WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"
import {compose,setDisplayName,setStatic, withProps,withStateHandlers}  from "recompose"
import {connect} from "react-redux"

import EventEmitter from "events"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"
import Ribbon, {Tab} from "./ribbon"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"

const KEY="default(accept=*)"

const Default={
	workspaces:[
		<Workspace
			debug={true}
			accept="*"
			key={KEY}
			layout="print"
			tools={<Ribbon commands={{layout:false}}/>}
			>
			<Editor
				layout="print"
				icon={<IconPrint/>}
				reCreateDoc={true}
				representation="pagination"
				/>

			<Editor
				layout="web"
				ruler={{vertical:false}}
				toolBar={<Ribbon commands={{layout:false}}/>}
				icon={<IconPrint/>}
				representation="html"
				/>

			<Editor
				layout="plain text"
				ruler={false}
				toolBar={<Ribbon commands={{
					home:{
						text:false,
						paragraph:false
					},
					insert:false,layout:false,when:false,
				}}/>}
				icon={<IconPrint/>}
				representation="text"
				/>

		</Workspace>
	]
}

var myOffice=[Default]
var event=new EventEmitter()

export default compose(
		setDisplayName("Office"),
		setStatic("install", function install(office1){
			myOffice.push(office1)
			event.emit("change", myOffice)
		}),

		setStatic("uninstall", function uninstall(office1){
			myOffice.splice(myOffice.indexOf(office1),1)
			event.emit("change",myOffice)
		}),
		withStateHandlers(
			({office=[...myOffice]})=>({office}),
			{
				changeOffice:({office})=>(newOffice)=>({office:[...newOffice]})
			}
		),
		withProps(({installable, changeOffice})=>{
			if(installable){
				event.on("change", newOffice=>changeOffice(newOffice))
			}
		}),
		withProps(({office,  ...props})=>{
			let _=office.reduce((merged,a)=>({
				...merged,
				...a,
				workspaces:[...(a.workspaces||[]), ...merged.workspaces]
			}),{workspaces:[]})

			let {titleBar=_.titleBar, dashboard=_.dashboard, workspaces=_.workspaces,reducers={}}=props
			reducers=workspaces.reduce((collected,a)=>{
				if(a.props.reducer){
					collected[a.key]=(state,action)=>{
						let reduced=a.props.reducer(state,action)
						return {...state,...reduced}
					}
				}
				return collected
			},{...reducers})

			return {
				titleBar,
				dashboard,
				workspaces,
				reducers
			}
		})
	)(({
        titleBarProps,
        fonts=["Arial", "Calibri", "Cambria"],
		children,
		titleBar,
		dashboard,
		workspaces,
		reducers,
    })=>{
		return (
			<WeEdit reducers={reducers}>
				<WeEditUI {...{titleBarProps, fonts, titleBar,dashboard}}>
					{workspaces}
					{children}
				</WeEditUI>
			</WeEdit>
		)
	})
