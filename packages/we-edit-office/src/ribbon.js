import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
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

const supports=[]

const Toolbar=props=><Toolbar0 style={{justifyContent:"initial"}} {...props}/>
const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

const Ribbon=compose(
	setDisplayName("Ribbon"),
	setStatic("install",function install(ribbons,type){
		if(!type){
			let i=supports.findIndex(a=>a[1])
			supports.splice(i,0,[ribbons,type])
		}else{
			supports.push([ribbons,type])
		}
	}),
	getContext({muiTheme:PropTypes.object,selection:PropTypes.object}),
)(({children, selection, 
	muiTheme, 
	buttonStyle={height:24, fontSize:10, lineHeight:"24px", paddingRight:5,  paddingLeft:5},
	tabStyle={width:"auto"}
	})=>{
	let plugins=supports
		.reduce((tabs, [ribbons, type],i)=>{
			
			ribbons=(()=>{
				if(type){
					if(!selection)
						return null
					
					let style=selection.props(type)
					if(style){
						return ribbons({style,selection})
					}else{
						return null
					}
				}else{
					return ribbons({selection})
				}})();
				
			if(!ribbons)
				return tabs
			ribbons=(Array.isArray(ribbons) ? ribbons : [ribbons]).filter(a=>!!a)
			if(ribbons.length==0)
				return tabs
			ribbons.forEach(a=>{
				tabs.push(React.cloneElement(a,{
					key:a.props.label,
					buttonStyle:{
						...(a.props.buttonStyle||{}),
						...buttonStyle,
						backgroundColor:"antiquewhite"
					},
					style:{...(a.props.tabStyle||{}),...tabStyle, marginRight:2}
				}))
			})
			return tabs
		},[])

	return (
		<div>
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
					<Tab label="Home" buttonStyle={buttonStyle} style={tabStyle}>
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
					<Tab label="Insert"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<Table.Create>
								<ToolbarSeparator/>
							</Table.Create>
							
							<Picture.Tools>
								<ToolbarSeparator/>
							</Picture.Tools>
						</Toolbar>
					</Tab>
					<Tab label="Design"  buttonStyle={buttonStyle} style={tabStyle}>
					</Tab>
					<Tab label="Page Layout"  buttonStyle={buttonStyle} style={tabStyle}>
						<Toolbar>
							<Layout.Tools/>
						</Toolbar>
					</Tab>
					<Tab label="Review"  buttonStyle={buttonStyle} style={tabStyle}>
					</Tab>
					<Tab label="View"  buttonStyle={buttonStyle} style={tabStyle}>
					</Tab>
					<Tab label="Developer"  buttonStyle={buttonStyle} style={tabStyle}>
					</Tab>
					{children}
					{plugins}
					<Tab label="beautifier"  
						buttonStyle={buttonStyle}
						style={{visibility:"hidden", flex:"1 100%",...tabStyle}}
						/>
				</Tabs>
			</MuiThemeProvider>
		</div>
	)
})

Ribbon.install(Table.Ribbon, "table")
Ribbon.install(Picture.Ribbon, "image")

export default Ribbon


