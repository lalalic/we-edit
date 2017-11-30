import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import {Toolbar} from "material-ui"

import Text from "./text"
import Paragraph from "./paragraph"
import File from "./file"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export class Workspace extends Component{
	render(){
		const {children, docs, active}=this.props
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
					{docs.map(({id,doc})=>(
						<Document key={id} doc={doc} active={id==active}>
							{children}
						</Document>
					))}
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

class Document extends Component{
	
	static childContextTypes={
		store:PropTypes.object
	}
	
	constructor(){
		super(...arguments)
	}
	
	getChildContext(){
		return {
			
		}
	}
	
	render(){
		const {doc,active,children}=this.props
		return (
			<div style={{visibility: active ? "inherit" : "hidden"}}>
				<doc.Store>
					{children}
				</doc.Store>
			</div>
		)
	}
}

export default connect(({active,docs})=>({active,docs}))(Workspace)