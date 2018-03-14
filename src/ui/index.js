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
import * as Table from "we-edit-ui/table"

import {getActive, selector} from "we-edit"
import {WithSelection} from "we-edit/component"

import Status from "we-edit-ui/status"
import Ruler from "we-edit-ui/ruler"
import Zoom from "we-edit-ui/components/zoom"

require("./style.less")


export class Workspace extends PureComponent{
	static childContextTypes={
		cursorPlaced: PropTypes.func,
		statistics: PropTypes.func,
	}
	
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
		scale: {
			max:200,
			min:20,
			current:100
		},
		words: "...",
		pages: "...",
	}
	
	get layouts(){
		return Children.toArray(this.props.children)
			.map(({props:{layout,icon}})=>layout ? {layout,icon} : null)
			.filter(a=>!!a)
	}
	
	getChildContext(){
		const self=this
		return {
			cursorPlaced(){
				self.setState({composed:Date.now()})
			}
		}
	}
	
	render(){
		let {doc, children, toolBar, statusBar, ruler=true}=this.props
		children=Children.toArray(children)
		const {layout, scale,pages, words}=this.state
		
		let current=children.find(({props})=>props.layout==layout)
		const uncontrolled=children.filter(({props})=>!props.layout)
		
		if(current){
			toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
			statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
			ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
			current=React.cloneElement(current,{scale:scale.current/100})
		}
		
		return (
			<doc.Store style={{flex:"100%", display:"flex", flexDirection:"column"}}>
				<WithSelection  style={{flex:1, display:"flex", flexDirection:"column"}}>
					<div style={{flext:1,order:1}}>
						{toolBar}
					</div>

					<div style={{order:3}}>
						{statusBar ? React.cloneElement(statusBar,{
							layout:{
								items:this.layouts,
								current:layout,
								onChange: layout=>this.setState({layout})
							},
							pages,
							scale:{
								...scale,
								onChange: a=>this.setState({scale:{...scale,current:a}})
							},
							words,
						}) : null}
					</div>

					<div style={{order:2,flex:"1 100%", background:"lightgray",overflow:"auto"}}>
						<div style={{display:"flex", flexDirection:"row"}}>

							{ruler ? <VerticalRuler scale={scale.current/100} ccomposed={this.state.composed} /> : null}

							{ruler ? (
							<div ref="rulerContainer" style={{position:"absolute",paddingTop:4, background:"lightgray"}}>
								<Ruler direction="horizontal" scale={scale.current/100}/>
							</div>
							) : null}

							<div ref="contentContainer" style={{flex:"1 100%", textAlign:"center", margin:"4px auto auto auto"}}>
								<div style={{margin:"auto",display:"inline-block"}}>
									{current}
									{uncontrolled}
								</div>
							</div>
						</div>
						
					</div>
				</WithSelection>
			</doc.Store>
		)
	}
	componentDidMount(){
		if(this.refs.rulerContainer){
			this.refs.rulerContainer.style.width=this.refs.contentContainer.getBoundingClientRect().width+"px"
		}
	}
}

const VerticalRuler=compose(
	getContext({
		selection: PropTypes.object
	})
)(({selection, ...props})=>{
	let {pageY:top}=selection.props("page")
	return (
		<div style={{position:"relative",width:0,top}}>
			<Ruler direction="vertical" {...props}/>
		</div>
	)
})

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
				.find(({props:{accept=a=>!!a}})=>{
					if(typeof(accept)=="string"){
						let glob=accept
						accept=a=>minimatch(a.name,glob)
					}

					if(typeof(accept)=="function")
						return accept(active)

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



//export WithSelection
