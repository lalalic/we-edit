import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect, getSelectionStyle} from "we-edit"
import {compose,mapProps,setDisplayName,getContext,setStatic,branch,renderNothing}  from "recompose"

import {Toolbar as Toolbar0,ToolbarSeparator as ToolbarSeparator0, Tabs, Tab} from "material-ui"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Text from "./text"
import Paragraph from "./paragraph"
import File from "./file"
import History from "./history"

import * as Table from "./table"
import * as Picture from "./picture"
import * as Layout from "./layout"

const Toolbar=props=><Toolbar0 style={{justifyContent:"initial"}} {...props}/>
const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

const Ribbon=compose(
	setDisplayName("Ribbon"),
	getContext({muiTheme:PropTypes.object,selection:PropTypes.object}),
	connect(state=>({selection:getSelectionStyle(state)}))
)(({children, selection,
	muiTheme,
	buttonStyle={height:24, fontSize:10, lineHeight:"24px", paddingRight:5,  paddingLeft:5},
	tabStyle={width:"auto"},
	style,
	commands={layout:false}
	})=>{
		let {home,insert,layout,when}="home,insert,layout,when".split(",").reduce((merged,k)=>{
				if(commands[k]  || commands[k]===undefined){
					if(typeof(commands[k])=="object"){
						merged[k]={...merged[k], ...commands[k]}
					}
					if(k=="when"){
						if(!selection){
							merged[k]=null
						}else{
							let when=merged.when
							merged.when=Object.keys(when)
								.reduce((collected,type)=>{
									let style=selection.props(type)
									if(style){
										let plugins=when[type].type({style,selection})
										if(Array.isArray(plugins)){
											collected=[...collected, ...plugins]
										}else if(plugins){
											collected.push(plugins)
										}
									}
									return collected
								},[])
								.map(a=>React.cloneElement(a,{
										key:a.props.label,
										buttonStyle:{
											...(a.props.buttonStyle||{}),
											...buttonStyle,
											backgroundColor:"antiquewhite"
										},
										style:{...(a.props.tabStyle||{}),...tabStyle, marginRight:2}
									})
								)
						}
					}
				}else{
					merged[k]=commands[k]
				}
				return merged
			},{
			home:{
				file: <File/>,
				history: <History><ToolbarSeparator/></History>,
				text: <Text><ToolbarSeparator/></Text>,
				paragraph: <Paragraph><ToolbarSeparator/></Paragraph>
			},
			insert:{
				table:<Table.Create><ToolbarSeparator/></Table.Create>,
				picture:<Picture.Tools><ToolbarSeparator/></Picture.Tools>,
			},
			layout:{
				basic:<Layout.Tools/>
			},
			when:{
				table:<Table.Ribbon/>,
				picture: <Picture.Ribbon/>,
			}
		})
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
					height:30
				}
			})}>
				<Tabs
					contentContainerStyle={{height:30}}
					inkBarStyle={{display:"none"}}
					>
					{home && <Tab label="Home" buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							{home.file}

							{home.history}

							{home.text}

							{home.paragraph}

							{home.more}
						</Toolbar>
					</Tab>}
					{insert && <Tab label="Insert"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							{insert.table}
							{insert.picture}
							{insert.more}
						</Toolbar>
					</Tab>}

					{layout && <Tab label="Page Layout"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							{layout.basic}
							{layout.more}
						</Toolbar>
					</Tab>}
					{React.Children.toArray(children).map(a=>React.cloneElement(a,{buttonStyle, style:tabStyle,key:a.props.label}))}
					{when}
					<Tab label="beautifier"
						buttonStyle={buttonStyle}
						style={{visibility:"hidden", flex:"1 100%",...tabStyle}}
						/>
				</Tabs>
			</MuiThemeProvider>
		</div>
	)
})

export default Ribbon

export {Ribbon, Text, Paragraph,File,History,Table,Picture,Layout, Toolbar, ToolbarSeparator, Tab}
