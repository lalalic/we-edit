import React, {Fragment} from "react"
import {DOMAIN, WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"
import {compose,setDisplayName,setStatic, withProps}  from "recompose"
import {connect} from "react-redux"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"
import Ribbon, {Tab} from "./ribbon"

import IconRead from "material-ui/svg-icons/communication/import-contacts"
import IconPrint from "material-ui/svg-icons/editor/format-align-justify"

const KEY="default(accept=*)"
const TextEditor=compose(
	connect(state=>{
		//debugger
		//let {text}=state[KEY]
		//return text
	}),
)((props)=>(<Editor {...props}/>))

const TextEditorTool=compose(
	connect(state=>{
		let {text}=state[KEY]
		return text
	},({dispatch})=>{
		return {
			toggle(k){
				dispatch({type:`${DOMAIN}/${KEY}/text/toggle`,payload:k})
			}
		}
	})
)(({toggle,wrap=true,colorful=false})=>
	<div style={{lineHeight:"30px"}}>
		<span>
			<input type="checkbox" checked={wrap} onClick={()=>toggle("wrap")}/>
			<span>wrap</span>
		</span>
		<span>
			<input type="checkbox" checked={colorful} onClick={()=>toggle("colorful")}/>
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
			layout="plain text"
			tools={<Ribbon commands={{layout:false}}/>}
			reducer={(state={
					text:{
						wrap:true,
						colorful:false,
						size:11,
						fonts:"arial",
						lineHeight:"100%",
					}
				},{type,payload})=>{
					switch(type){
						case "office/*/text/toggle":{
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

			<Editor
				layout="web"
				ruler={{vertical:false}}
				toolBar={<Ribbon commands={{layout:false}}/>}
				icon={<IconPrint/>}
				representation="html"
				/>

			<Workspace.Desk
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
				>
				<Editor representation="text"  
					size={12} fonts="calibri" 
					colorful={true} wrap={false}
					/>
			</Workspace.Desk>
				
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
					collected[a.key]=(state={},action)=>{
						let reduced=a.props.reducer(state[a.key],action)
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
