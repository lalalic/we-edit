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

import Ruler from "we-edit-ui/ruler"
import Status from "we-edit-ui/status"
import Zoom from "we-edit-ui/components/zoom"

require("./style.less")
				

export class Workspace extends PureComponent{
	render(){
		const {doc, children}=this.props
		let child=Children.only(children)
		return (
			<doc.Store style={{display:"flex", flexDirection:"column"}}>
				<WithSelection  style={{flex:1, display:"flex", flexDirection:"column"}}>
					<div style={{flext:1,order:1}}>
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
						<Ruler direction="horizontal"/>
					</div>
					
					<div style={{order:3}}>
						<Status />
					</div>
					
					<div style={{order:2,display:"flex", flexDirection:"row",overflowY:"scroll", overflowX:"hidden"}}>
						<VerticalRuler gap={child.props.pgGap}/>
						<div>
							<Canvas>
								{child}
							</Canvas>
						</div>
					</div>
				</WithSelection>
			</doc.Store>
		)
	}
}

const VerticalRuler=getContext({
	selection: PropTypes.object
})(({selection,gap})=>{
	let {pageY:top=gap}=selection.props("page")
	return (
		<div style={{position:"relative",width:0,top}}>
			<Ruler direction="vertical"/>
		</div>
	)
})

export const Bare=({doc,children,...props})=>(<doc.Store {...props}><WithSelection>{children}</WithSelection></doc.Store>)

export default compose(
	setDisplayName("FilterableThemeProvider"),
	connect(state=>({active:getActive(state).doc})),
)(class extends PureComponent{
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
		}), style}=this.props
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
					<TitleBar/>
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
