import React, {PureComponent} from "react"
import PropTypes from "prop-types"

import {DOMAIN, WeEdit, Viewer, Editor, Emitter,Stream, Representation} from "we-edit"
import memoize from "memoize-one"

import EventEmitter from "events"

import WeEditUI from "./we-edit-ui"
import Workspace from "./workspace"
import Ribbon, {Tab} from "./ribbon"

import IconPrint from "material-ui/svg-icons/action/view-module"
import IconWeb from "material-ui/svg-icons/editor/format-align-justify"
import IconText from "material-ui/svg-icons/content/text-format"

const KEY="default(accept=*)"
var myOffice=[
		<Workspace
			debug={true}
			accept="*"
			key={KEY}
			channel="print"
			>
			
			<Workspace.Desk 
				channel="print"
				icon={<IconPrint/>}
				children={<Editor representation="pagination"/>}
				/>
			

			<Workspace.Desk
				channel="web"
				ruler={{vertical:false}}
				icon={<IconWeb/>}
				children={<Editor representation="html"/>}
				/>

			<Workspace.Desk
				channel="plain text"
				ruler={false}
				toolBar={<Ribbon commands={{
					home:{
						text:false,
						paragraph:false
					},
					insert:false,layout:false,when:false,
				}}/>}
				icon={<IconText/>}
				children={<Editor representation="text"/>}
				/>
		</Workspace>
]
const event=new EventEmitter()


export default class Office extends PureComponent{
	static propTypes={
		workspaces: PropTypes.arrayOf(PropTypes.element),
		installable:PropTypes.bool,
	}

	static defaultProps={
		installable:true,
	}
	
	static install(...workspaces){
		workspaces.reverse().forEach(a=>myOffice.unshift(a))
		event.emit("change", [...myOffice])
	}

	static uninstall(...workspaces){
		workspaces.forEach(a=>myOffice.splice(myOffice.indexOf(a),1))
		event.emit("change",[...myOffice])
	}

	static getDerivedStateFromProps({workspaces,installable},state){
		workspaces=workspaces||[...myOffice]
		if(installable){
			if(state.workspaces){
				return null
			}else{
				return {workspaces}
			}
		}else{
			return {workspaces}
		}
	}

	state={}

	getReducers=memoize((workspaces,reducers)=>{
		return workspaces.reduce((collected,a)=>{
			if(a.props.reducer){
				collected[a.key]=(state,action)=>{
					let reduced=a.props.reducer(state,action)
					return {...state,...reduced}
				}
			}
			return collected
		},{...reducers})
	})

	componentDidMount(){
		const {installable}=this.props
		if(installable){
			event.on("change", this.updateWorkspaces=workspaces=>{
				this.setState({workspaces})
			})
		}
	}

	render(){
		const {workspaces}=this.state
		let {titleBarProps,children, titleBar, dashboard, reducers={},
			fonts=["Arial", "Calibri", "Cambria"]}=this.props
		reducers=this.getReducers(workspaces,reducers)

		return (
			<WeEdit reducers={reducers}>
				<WeEditUI {...{titleBarProps, fonts, titleBar,dashboard}}>
					{workspaces.map(a=>a.props.reducer ? React.cloneElement(a,{reducer:undefined}) : a)}
					{children}
				</WeEditUI>
			</WeEdit>
		)
	}

	componentWillUnmount(){
		if(this.props.installable){
			event.removeListener("change",this.updateWorkspaces)
		}
	}

}
