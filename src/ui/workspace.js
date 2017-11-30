import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import {Toolbar} from "material-ui"


import {WithStore} from "we-edit/component"

import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export class Workspace extends Component{
	render(){
		let {children, docs, active}=this.props
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<div>
						<Toolbar>
							<File/>
							<Text/>
							<Paragraph/>
						</Toolbar>
					</div>
					<div>
					{Object.keys(docs).map(k=>docs[k]).map(({id,doc})=>(
						<WithStore  key={id} storeKey={id} getState={state=>state.docs[id].state}>
							<Document doc={doc} active={id==active}>
								{children}
							</Document>
						</WithStore>
					))}
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

class Document extends Component{
	render(){
		const {doc,active,children}=this.props
		return (
			<div style={{display: active ? "inherit" : "hidden"}}>
				<doc.Store>
					{children}
				</doc.Store>
			</div>
		)
	}
}

export default connect(({active,docs})=>({active,docs}))(Workspace)
