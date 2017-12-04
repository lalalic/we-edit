import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName}  from "recompose"

import {Toolbar,ToolbarSeparator} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


import AppBar from "we-edit-ui/app-bar"
import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"
import Clipboard from "we-edit-ui/clipboard"
import Canvas from "we-edit-ui/canvas"

import {getActive} from "we-edit"


export class Workspace extends PureComponent{
	render(){
		const {doc}=this.props
		return (
			<div>
				<Toolbar>
					<File/>
					<ToolbarSeparator/>

					<Clipboard/>
					<ToolbarSeparator/>

					<Text/>
					<ToolbarSeparator/>

					<Paragraph/>
				</Toolbar>
				<Canvas doc={doc}>
					{this.props.children}
				</Canvas>
			</div>
		)
	}
}

export const Bare=({doc,...props})=>(<doc.Store {...props}/>)

export default compose(
	setDisplayName("workspace"),
	connect(state=>({active:getActive(state).doc})),
)(class extends PureComponent{
	render(){
		let {children,active,theme=getMuiTheme()}=this.props
		let child=null
		if(active){
			child=Children.toArray(children)
				.find(({props:{filter=a=>!!a}})=>{
					if(typeof(filter)=="string"){
						filter=filter.replace('.','\\\\.').replace('*','.*')
						filter=a=>new RegExp(filter,"i").test(a.name)
					}
					if(typeof(filter)=="function")
						return filter(active)
					
					return !!filter
				})
				
			if(child)
				child=React.cloneElement(child,{doc:active})
			else
				child=(<div>no editor for this document</div>)
		}
		
		return (
			<MuiThemeProvider muiTheme={theme}>
				<div>
					<AppBar/>
					{child}
				</div>
			</MuiThemeProvider>
		)
	}
})
