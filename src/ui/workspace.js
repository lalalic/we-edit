import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,setStatic}  from "recompose"

import {Toolbar,ToolbarSeparator} from "material-ui"
import {WithStore} from "we-edit/component"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {reducer} from "we-edit-ui"

import AppBar from "we-edit-ui/app-bar"
import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"
import Clipboard from "we-edit-ui/clipboard"
import Canvas from "we-edit-ui/canvas"
import Selection from "we-edit-ui/selection"

export class Workspace extends PureComponent{
	render(){
		let {children, docs, active,theme=getMuiTheme()}=this.props
		return (
			<MuiThemeProvider muiTheme={theme}>
				<div>
					<AppBar/>
					<WithStore
						storeKey={active}
						getState={({active,docs,...others})=>{
							if(!active){
								return {noDoc:true}
							}else{
								let doc=docs[active]
								return {...doc, selection:new Selection(doc.state)}
							}
						}>
						<Toolbar>
							<File/>
							<ToolbarSeparator/>

							<Clipboard/>
							<ToolbarSeparator/>

							<Text/>
							<ToolbarSeparator/>

							<Paragraph/>
						</Toolbar>
					</WithStore>
					{Object.keys(docs).map(k=>docs[k]).map(({id,doc})=>(
						<WithStore  key={id}
							storeKey={id}
							getState={state=>state.docs[id].state}>
							<div style={{display: active==id ? "block" : "none"}}>
								<Canvas doc={doc}>
									{children}
								</Canvas>
							</div>
						</WithStore>
					))}
				</div>
			</MuiThemeProvider>
		)
	}
}

export default compose(
	setStatic("reducer",{workspace:reducer}),
	setDisplayName("workspace"),
	connect(({active,docs})=>({active,docs}))
)(Workspace)
