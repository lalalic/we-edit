import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {compose,mapProps,setDisplayName,getContext,setStatic,branch,renderNothing}  from "recompose"

import {Toolbar,ToolbarSeparator, Tabs, Tab} from "material-ui"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Text from "./text"
import Paragraph from "./paragraph"
import File from "./file"
import History from "./history"
import * as Table from "./table"

const supports=[]

const Ribbon=compose(
	setDisplayName("Ribbon"),
	setStatic("support",function support(ribbons,type){
		if(!type){
			let i=supports.findIndex(a=>a[1])
			supports.splice(i,0,[ribbons,type])
		}else{
			supports.push([ribbons,type])
		}
	}),
	getContext({muiTheme:PropTypes.object,selection:PropTypes.object}),
)(({selection, muiTheme, buttonStyle={height:24, fontSize:10, lineHeight:"24px"}})=>{
	let children=supports
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
					buttonStyle:{...(a.props.buttonStyle||{}),...buttonStyle}
				}))
			})
			return tabs
		},[])

	return (
		<div style={{display:"inline-block"}}>
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
					className="ribbon"
					contentContainerStyle={{height:30}}
					>
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
					<Tab label="Design"  buttonStyle={buttonStyle}>
					</Tab>
					<Tab label="Page Layout"  buttonStyle={buttonStyle}>
					</Tab>
					<Tab label="Review"  buttonStyle={buttonStyle}>
					</Tab>
					<Tab label="View"  buttonStyle={buttonStyle}>
					</Tab>
					<Tab label="Developer"  buttonStyle={buttonStyle}>
					</Tab>
					{children}
				</Tabs>
			</MuiThemeProvider>
		</div>
	)
})

export default Ribbon

//Ribbon.support(Table.ribbons, "table")
