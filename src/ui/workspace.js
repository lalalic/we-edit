import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName,setStatic}  from "recompose"

import {Toolbar, AppBar,IconButton,Drawer,Menu,MenuItem,Popover,FlatButton} from "material-ui"


import {WithStore} from "we-edit/component"

import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"
import Clipboard from "we-edit-ui/clipboard"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'


import IconClose from "material-ui/svg-icons/navigation/close"
import IconFiles from "material-ui/svg-icons/navigation/arrow-drop-down"

import Dashboard from "we-edit-ui/dashboard"

import {ACTION, reducer} from "."

export class Workspace extends Component{
	state={showDrawer:false, showFiles:false}
	render(){
		let {children, docs, active, setActive,close,}=this.props
		let actived=docs[active]
		docs=Object.keys(docs).map(k=>docs[k])
		let {showDrawer,showFiles, fileAnchor}=this.state
		let drawer=null
		if(showDrawer){
			drawer=<Dashboard dispear={()=>this.setState({showDrawer:false})}/>
		}
		
		let currentFile=null
		if(actived){
			currentFile=(
				<FlatButton 
					icon={<IconFiles style={{visibility: docs.length>1 ? "inherit" : "hidden"}}/>}
					label={actived.doc.name}
					labelPosition="before"
					onClick={e=>docs.length>1 && this.setState({showFiles:true,fileAnchor:e.currentTarget}) }/>
			)
		}
		
		let files=null
		if(showFiles && docs.length>1){
			files=(
				<Popover 
					anchorEl={fileAnchor}
					anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
					targetOrigin={{ vertical: 'top', horizontal: 'left',}}
					onRequestClose={()=>this.setState({showFiles:false,fileAnchor:undefined})}
					open={true}>
					<Menu>
						{docs.map(({id,doc})=>(
							<MenuItem key={id} 
								onClick={()=>{
									setActive(id)
									this.setState({showFiles:false,fileAnchor:undefined})
								}}
								primaryText={doc.name}/>
						))}
					</Menu>
				</Popover>
			)
		}
		
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<div>
						{drawer}
						<AppBar 
							style={{zoom:1}}
							title="we edit"
							iconElementRight={
								<div>
									{currentFile}
									{files}
									<IconButton onClick={close}>
										<IconClose/>
									</IconButton>
								</div>
							}
							onLeftIconButtonTouchTap={()=>this.setState({showDrawer:!this.state.showDrawer})}
							/>
							
						<WithStore 
							storeKey={active} 
							getState={state=>state.docs[state.active]||{noDoc:true}}>
							<Toolbar>
								<File/>
								<Clipboard/>
								<Text/>
								<Paragraph/>
							</Toolbar>
						</WithStore>
					</div>
					<div>
					{docs.map(({id,doc})=>(
						<WithStore  key={id} 
							storeKey={id} 
							getState={state=>state.docs[id].state}>
							<Canvas doc={doc} active={id==active}>
								{children}
							</Canvas>
						</WithStore>
					))}
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

class Canvas extends Component{
	render(){
		const {doc,active,children}=this.props
		return (
			<div style={{display: active ? "block" : "none"}}>
				<doc.Store>
					{children}
				</doc.Store>
			</div>
		)
	}
}



export default compose(
	setStatic("reducer",{workspace:reducer}),
	setDisplayName("workspace"),
	getContext({store:PropTypes.object}),
	mapProps(({store:{dispatch},children})=>({
		setActive(id){
			dispatch(ACTION.ACTIVE(id))
		},
		close(){
			dispatch(ACTION.CLOSE())
		},
		children
	})),
	connect(({active,docs})=>({active,docs}))
)(Workspace)
