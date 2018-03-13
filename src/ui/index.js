import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,getContext,withContext}  from "recompose"
import minimatch from "minimatch"

import {Toolbar,ToolbarSeparator, ToolbarTitle, Tabs, Tab, Snackbar} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


import TitleBar from "we-edit-ui/app-bar"
import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"
import History from "we-edit-ui/history"
import Canvas from "we-edit-ui/canvas"
import * as Table from "we-edit-ui/table"

import {getActive, selector} from "we-edit"

import Status from "we-edit-ui/status"
import Zoom from "we-edit-ui/components/zoom"

require("./style.less")


export class Workspace extends PureComponent{
	static propTypes={
		toolBar:PropTypes.node,
		statusBar: PropTypes.node,
	}
	
	static defaultProps={
		toolBar: (
			<Zoom scale={0.6}>
				<div style={{display:"inline-block",width:200}}>
					<Tabs>
						<Tab label="Home">
							<Toolbar>
								<File/>
								<History>
									<ToolbarSeparator/>
								</History>

								<Text>
									<ToolbarSeparator/>
								</Text>

								<Paragraph/>
							</Toolbar>
						</Tab>
						<Tab label="Insert">
							<Toolbar>
								<Table.Create/>
							</Toolbar>
						</Tab>
					</Tabs>
				</div>
			</Zoom>
		),
		
		statusBar:(<Status/>),
	}
	
	state={
		layout:this.props.layout,
		scale: this.props.scale
	}
	
	get layouts(){
		return Children.toArray(this.props.children)
			.map(({props:{layout,icon}})=>layout ? {layout,icon} : null)
			.filter(a=>!!a)
	}
	
	render(){
		const {doc, children, toolBar, statusBar}=this.props
		const {layout, scale}=this.state
		return (
			<doc.Store style={{display:"flex", flexDirection:"column"}}>
				<WithSelection  style={{flex:1, display:"flex", flexDirection:"column"}}>
					<div style={{flext:1,order:1}}>
						{toolBar}
					</div>

					<div style={{order:3}}>
						{React.cloneElement(statusBar,{
							layout:{
								items:this.layouts,
								current:layout,
								onChange: layout=>this.setState({layout})
							}
						})}
					</div>

					<div style={{order:2,background:"lightgray",overflow:"auto"}}>
						<Canvas>
							{Children.toArray(children).filter(({props:{layout:a}})=>a==layout || !a)}
						</Canvas>
					</div>
				</WithSelection>
			</doc.Store>
		)
	}
}

export const Bare=({doc,children,...props})=>(<doc.Store {...props}><WithSelection>{children}</WithSelection></doc.Store>)

export default compose(
	setDisplayName("FilterableThemeProvider"),
	connect(state=>({active:getActive(state).doc})),
)(class extends PureComponent{
	static propTypes={
		titleBar:PropTypes.node
	}
	
	static defaultProps={
		titleBar:<TitleBar/>
	}
	
	state={}
	componentDidCatch(error, info){
		this.setState({error})
	}

	render(){
		let {children,active,theme=getMuiTheme({
			tabs:{
				backgroundColor:"transparent",
				textColor: "black",
				selectedTextColor: "red",
			},
			appBar:{
				color: "transparent",
				textColor: "black",
			},
			toolbar:{
				backgroundColor: "transparent",
				height: 30,
			}
		}), titleBar, style}=this.props
		let child=null
		if(active){
			child=Children.toArray(children)
				.find(({props:{filter=a=>!!a}})=>{
					if(typeof(filter)=="string"){
						let glob=filter
						filter=a=>minimatch(a.name,glob)
					}

					if(typeof(filter)=="function")
						return filter(active)

					return false
				})

			if(child)
				child=React.cloneElement(child,{doc:active})
			else
				child=(<div>no editor for this document</div>)
		}

		const {error}=this.state

		return (
			<MuiThemeProvider muiTheme={theme}>
				<div style={{width:"100%",display:"flex", flexDirection:"column",position:"absolute",height:"100%", ...style}}>
					{titleBar}
					<div style={{flex:"100%",display:"flex", flexDirection:"column"}}>
						{child}
					</div>
					<Snackbar
						open={!!error}
						message={error||""}
						autoHideDuration={4000}
						onRequestClose={()=>this.setState({error:undefined})}
						/>
				</div>
			</MuiThemeProvider>
		)
	}
})

const WithSelection=compose(
	getContext({
		selected:PropTypes.func
	}),
	connect((state,{selected})=>{
		return {
			selection: selected(state)
		}
	}),
	withContext(
		{selection:PropTypes.shape({props:PropTypes.func})},
		({selection})=>({selection}),
	),
)(({children,style})=><div style={style}>{children}</div>)

//export WithSelection
