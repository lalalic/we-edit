import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,getContext,withContext}  from "recompose"
import minimatch from "minimatch"

import {Toolbar,ToolbarSeparator, ToolbarTitle, Tabs, Tab, Snackbar} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Text from "we-edit-ui/text"
import Paragraph from "we-edit-ui/paragraph"
import File from "we-edit-ui/file"
import History from "we-edit-ui/history"
import * as Table from "we-edit-ui/table"

import {getActive, selector} from "we-edit"
import {WithSelection} from "we-edit/component"

import Status from "we-edit-ui/status"
import Ruler from "we-edit-ui/ruler"

export const Ribbon=compose(
	setDisplayName("Ribbon"),
	getContext({muiTheme:PropTypes.object}),
)(({children, muiTheme, buttonStyle={height:24, fontSize:10, lineHeight:"24px"}})=>(
	<div style={{display:"inline-block",width:200}}>
		<MuiThemeProvider muiTheme={getMuiTheme(muiTheme,{
			sizeIconButton:{
				size:24,
				padding:4,
			},
			comboBox:{
				height:24,
				textFieldStyle:{
					fontSize:12
				}
			},
			toolbar:{
				height:30
			},
			menuItem:{
				height: 24,
				padding:4,
			}
		})}>
			<Tabs>
				<Tab label="Home" buttonStyle={buttonStyle}>
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
				<Tab label="Insert"  buttonStyle={buttonStyle}>
					<Toolbar>
						<Table.Create/>
					</Toolbar>
				</Tab>
				{children}
			</Tabs>
		</MuiThemeProvider>
	</div>
))

export class Workspace extends PureComponent{
	static childContextTypes={
		eventemitter: PropTypes.shape({emit:PropTypes.func.isRequired}),
	}

	static propTypes={
		toolBar:PropTypes.node,
		statusBar: PropTypes.node,
	}

	static defaultProps={
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>),
	}

	state={
		layout:this.props.layout,
		scale: {
			max:200,
			min:20,
			current:100
		},
		words: 0,
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
			eventemitter: {
				emit(name,payload){
					switch(name){
					case "words":
						self.setState({words:this.state.words+payload})
					break
					case "pages":
						self.setState({pages:payload})
					break
					case "cursorPlaced":
						self.setState({composed:Date.now()})
					break
					}
				}
			}
		}
	}
	
	render(){
		let {children, toolBar, statusBar, ruler=true}=this.props
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
			<WithSelection>
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>
					<div style={{order:1,height:24+30}}>
						{toolBar}
					</div>

					<div style={{order:3,height:30}}>
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

					<div style={{order:2,flex:"1 100%", overflow:"auto", display:"flex", flexDirection:"column"}}>
						<div style={{flex:1, display:"flex", flexDirection:"row"}}>

							{ruler ? <VerticalRuler scale={scale.current/100} composed={this.state.composed} /> : null}

							{ruler ? (
							<div ref="rulerContainer" style={{position:"absolute",paddingTop:4}}>
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
				</div>
			</WithSelection>
		)
	}
	
	setupHorizontalRuler(){
		if(this.refs.rulerContainer){
			this.refs.rulerContainer.style.width=this.refs.contentContainer.getBoundingClientRect().width+"px"
		}
	}
	
	componentDidMount(){
		this.setupHorizontalRuler()
	}
	
	componentDidUpdate(){
		this.setupHorizontalRuler()
	}
}

export const VerticalRuler=compose(
	getContext({
		selection: PropTypes.object
	})
)(({selection, scale, ...props})=>{
	let {pageY=0}=selection.props("page")
	return (
		<div style={{position:"relative",width:0,top:pageY*scale}}>
			<Ruler direction="vertical" {...props} scale={scale}/>
		</div>
	)
})

export default Workspace
