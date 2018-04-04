import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,getContext,withContext}  from "recompose"
import minimatch from "minimatch"
import EventEmitter from "events"

import {Toolbar,ToolbarSeparator, ToolbarTitle, Tabs, Tab, Snackbar} from "material-ui"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {WithSelection, when} from "we-edit"

import Text from "./text"
import Paragraph from "./paragraph"
import File from "./file"
import History from "./history"
import * as Table from "./table"
import Status from "./status"
import Ruler from "./ruler"

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
				},
				menu:{
					style:{overflowX:"hidden"},
					menuItemStyle:{minHeight:"24px", lineHeight:"24px", fontSize:12}
				}
			},
			toolbar:{
				height:30
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

export default class Workspace extends PureComponent{
	static childContextTypes={
		events: PropTypes.object,
		debug: PropTypes.bool,
	}
	
	static propTypes={
		toolBar:PropTypes.node,
		statusBar: PropTypes.node,
	}

	static defaultProps={
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>),
	}


	constructor(){
		super(...arguments)
		this.state={
			layout:this.props.layout,
			scale: 100,
		}
	}

	getChildContext(){
		const {debug}=this.props
		return {
			events:new EventEmitter(),
			debug
		}
	}

	get layouts(){
		return Children.toArray(this.props.children)
			.map(({props:{layout,icon}})=>layout ? {layout,icon} : null)
			.filter(a=>!!a)
	}

	render(){
		let {doc, children, toolBar, statusBar, ruler=true, fonts}=this.props
		children=Children.toArray(children)
		const {layout, scale}=this.state

		let current=children.find(({props})=>props.layout==layout)
		const uncontrolled=children.filter(({props})=>!props.layout)

		if(current){
			toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
			statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
			ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
			current=React.cloneElement(current,{scale:scale/100})
		}

		return (
			<doc.Store>
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
								scale:{
									current:scale,
									onChange: scale=>this.setState({scale})
								},
							}) : null}
						</div>

						<div style={{order:2,flex:"1 100%", overflow:"auto", display:"flex", flexDirection:"column"}}>
							<div style={{flex:1, display:"flex", flexDirection:"row"}}>

								{ruler ? <VerticalRuler scale={scale/100} /> : null}

								{ruler ? (
								<div ref="rulerContainer" style={{position:"absolute",paddingTop:4}}>
									<Ruler direction="horizontal" scale={scale/100}/>
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
			</doc.Store>
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
	setDisplayName("VerticalRuler"),
	when("cursorPlaced",({pageY})=>({pageY})),
)(({pageY=0, scale, ...props})=>{
	return (
		<div style={{position:"relative",width:0,top:pageY*scale}}>
			<Ruler direction="vertical" {...props} scale={scale}/>
		</div>
	)
})
