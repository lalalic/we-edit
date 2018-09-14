import React, {Fragment} from "react"

import {DOMAIN, WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"
import {compose,setDisplayName,setStatic, withProps}  from "recompose"
import {connect} from "react-redux"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"
import Ribbon, {Tab} from "./ribbon"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"

import {VariantContext, VariantRepresentation} from "we-edit-variant"

const KEY="default(accept=*)"
const TextEditor=compose(
	setDisplayName("TextEditor"),
	connect(state=>{
		let {text}=state[KEY]
		return text
	}),
)((props)=>(<Editor {...props}/>))

const TextEditorTool=compose(
	setDisplayName("TextEditorTool"),
	connect(state=>{
		let {text}=state[KEY]
		return text
	},dispatch=>{
		return {
			toggle(k){
				dispatch({type:`${DOMAIN}/${KEY}/text/toggle`,payload:k})
			}
		}
	})
)(({toggle,wrap,colorful})=>
	<div style={{lineHeight:"30px"}}>
		<span>
			<input type="checkbox" checked={wrap} onChange={()=>toggle("wrap")}/>
			<span>wrap</span>
		</span>
		<span>
			<input type="checkbox" checked={colorful} onChange={()=>toggle("colorful")}/>
			<span>color</span>
		</span>
	</div>
)

const Default={
	workspaces:[
		<Workspace
			debug={true}
			accept="*"
			key={KEY}
			layout="variant"
			tools={<Ribbon commands={{layout:false}}/>}
			reducer={(state={
					text:{
						wrap:true,
						colorful:false,
						size:12,
						fonts:"calibri",
						lineHeight:"140%",
					}
				},{type,payload})=>{
					switch(type){
						case `${DOMAIN}/${KEY}/text/toggle`:{
							return {...state, text:{...state.text, [payload]:!state.text[payload]}}
						}
						default:
							return state
					}
				}
			}
			>
			<Viewer
				toolBar={null}
				ruler={false}
				layout="read"
				icon={<IconRead/>}
				representation="pagination"
				/>
				
			<Editor
				layout="print"
				icon={<IconPrint/>}
				reCreateDoc={true}
				representation="pagination"
				/>
				
			<VariantContext 
				layout="variant"
				icon={<IconPrint/>}
				value={{firstName:"raymond",lastName:"li"}}
				>
				<Editor
					reCreateDoc={true}
					representation={<VariantRepresentation type="pagination"/>}
					/>
			</VariantContext>

			<Editor
				layout="web"
				ruler={{vertical:false}}
				toolBar={<Ribbon commands={{layout:false}}/>}
				icon={<IconPrint/>}
				representation="html"
				/>

			<TextEditor
				layout="plain text"
				ruler={false}
				toolBar={<Ribbon commands={{
					home:{
						text:false,
						paragraph:false,
						more:(<TextEditorTool/>)
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

export default compose(
		setDisplayName("Office"),
		setStatic("install", function install(office1){
			myOffice.push(office1)
		}),

		setStatic("uninstall", function uninstall(office1){
			myOffice.splice(myOffice.indexOf(office1),1)
		}),
		withProps(props=>{
			let _=myOffice.reduce((merged,a)=>({
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
