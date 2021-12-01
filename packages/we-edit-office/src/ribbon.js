import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {whenSelectionChangeDiscardable, dom} from "we-edit"
import {compose,setDisplayName,getContext,withContext}  from "recompose"

import {Toolbar,ToolbarSeparator, ToolbarGroup, Tabs, Tab,} from "material-ui"
import tabTemplate from "material-ui/Tabs/TabTemplate"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Text from "./text"
import Paragraph from "./paragraph"
import File from "./file"
import History from "./history"
import Clipboard from "./clipboard"
import Recorder from "./record"

import * as Shape from "./shape"
import * as Table from "./table"
import * as Picture from "./picture"
import * as Layout from "./layout"
import * as Developer from "./developer"

import {PropTypesUI} from "./components"

const Ribbon=compose(
	setDisplayName("Ribbon"),
	getContext({muiTheme:PropTypes.object,selection:PropTypes.object}),
	whenSelectionChangeDiscardable(),
	withContext({uiContext:PropTypes.string},()=>({uiContext:"Ribbon"}))
)(class extends PureComponent{
	render(){
		const {
			children, selection,dispatch,muiTheme,style,commands={},
			tabStyle={width:"auto"},
			buttonStyle={height:24, fontSize:10, lineHeight:"24px", paddingRight:5,  paddingLeft:5},
			}=this.props
		
		const {home,insert,design,layout,developer,when}=this.normalizeCommands(commands, selection, buttonStyle, tabStyle,dispatch)
	return (
		<div style={{height:24+30, borderBottom:"0.5px solid lightgray",marginBottom:1,paddingBottom:4, ...style}}>
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
					height:30,
				},

				spacing:{
					desktopGutter:4,
					desktopGutterMore: "50%",
				}

				})}>
				<Tabs
					contentContainerStyle={{height:30}}
					inkBarStyle={{display:"none"}}
					tabTemplate={ref=>ref.selected ? tabTemplate(ref) : React.cloneElement(tabTemplate(ref),{children:null})}
					>
					{home && <Tab label="Home" buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<ToolbarGroup>
								{home.file}

								{home.clipboard}

								{home.history}

								{home.text}

								{home.paragraph}

								{home.more}
							</ToolbarGroup>
						</Toolbar>
					</Tab>}
					{insert && <Tab label="Insert"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<ToolbarGroup>
								{insert.page}
								{insert.table}
								{insert.picture}
								{insert.shape}
								{insert.variant}
								{insert.more}
							</ToolbarGroup>
						</Toolbar>
					</Tab>}

					{design && <Tab label="Style"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<ToolbarGroup>
								{design.theme}
								{design.color}
								{design.font}
								{design.effect}
								{design.more}
								{<PropTypesUI propTypes={dom.Text.propTypes} theme="Text"/>}
							</ToolbarGroup>
						</Toolbar>
					</Tab>}

					{layout && <Tab label="Layout"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<ToolbarGroup>
								{layout.document}
								{layout.section}
								{layout.page}
								{layout.paragraph}
								{layout.shape}
								{layout.more}
							</ToolbarGroup>
						</Toolbar>
					</Tab>}
					{when && when.map(a=><Tab key={a.props.label} label={a.props.label} buttonStyle={{...buttonStyle,backgroundColor: "antiquewhite"}} style={{...tabStyle,marginRight:2}}>
						<Toolbar>
							<ToolbarGroup>
								{React.cloneElement(a,{label:undefined})}
							</ToolbarGroup>
						</Toolbar>
					</Tab>)}
					{developer && <Tab label="Developer" buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<ToolbarGroup>
								{developer.information}
								{developer.recorder}
								{developer.debug}	
								{developer.more}
							</ToolbarGroup>	
						</Toolbar>
					</Tab>}
					{React.Children.toArray(children).map(a=>React.cloneElement(a,{key:a.props.label, ...(a.type==Tab ? {buttonStyle, style:tabStyle} : {})}))}
					<Tab label="beautifier"
						buttonStyle={buttonStyle}
						style={{visibility:"hidden", flex:"1 100%",...tabStyle}}
						/>
				</Tabs>
			</MuiThemeProvider>
		</div>
		)
	}

	normalizeCommands(commands, selection, buttonStyle, tabStyle, dispatch) {
		return "home,insert,design,layout,when,developer".split(",").reduce((merged, k) => {
			if (commands[k] || commands[k] === undefined) {
				if (typeof (commands[k]) == "object") {
					merged[k] = { ...merged[k], ...commands[k] }
				}
				if (k == "when") {
					if (!selection) {
						merged[k] = null
					} else {
						const when = merged.when
						merged.when = Object.keys(when).filter(k=>when[k])
							.reduce((collected, type) => {
								const style = selection.props(type)
								if (style) {
									let plugins=when[type]
									plugins=!Array.isArray(plugins) ? [plugins] : plugins
									plugins.forEach(plugin=>{
										if(React.isValidElement(plugin)){
											collected.push(React.cloneElement(plugin,{
												label:plugin.props.label||`${type.charAt(0).toUpperCase()+type.substr(1)} Format`
											}))
										}
									})
								}
								return collected
							}, [])
					}
				}
			} else {
				merged[k] = commands[k]
			}
			return merged
		}, {
			home: {
				file: <File><ToolbarSeparator /></File>,
				clipboard: <Clipboard><ToolbarSeparator /></Clipboard>,
				history: <History><ToolbarSeparator /></History>,
				text: <Text><ToolbarSeparator /></Text>,
				paragraph: <Paragraph><ToolbarSeparator /></Paragraph>
			},
			insert: {
				table: <Table.Create/>,
				picture: <Picture.Create/>,
				shape: <Shape.Create/>,
			},
			design: {
				theme: null,
				color: null,
				font: null,
				effect: null,
			},
			layout: {
				//section: <Layout.Section/>,
				page: <Layout.Page/>,
				shape: <Layout.Shape/>,
				paragraph: <Layout.Paragraph/>,
			},
			developer: {
				information: <Developer.Ribbon />,
				debug: null,
				recorder: <Recorder />,
			},
			when: {
				table: <Table.Active label="Table Format"/>,
				shape: <Shape.Active label="Shape Format"/>,
				picture: null,
			}
		})
	}
})

export default Ribbon
export {Create as Shape} from "./shape"
export {Ribbon, Clipboard, Text, Paragraph,File,History,Table,Picture,Layout,Developer,Recorder}
