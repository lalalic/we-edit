import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,setDisplayName}  from "recompose"
import minimatch from "minimatch"

import memoize from "memoize-one"

import {Snackbar} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TitleBar from "./title-bar"
import Dashboard from "./dashboard"
import {getActive,Input} from "we-edit"
import {grey50 as BACKGROUND} from "material-ui/styles/colors"

import "./style.less"

const styles={
	root:{
		position:"absolute",
		width:"100%",
		height:"100%",
		display:"flex",
		flexDirection:"column",
		background:BACKGROUND,
		overflow:"hidden",
	},
	theme:{
		tabs:{
			backgroundColor:"transparent",
			textColor: "black",
			selectedTextColor: "red",
		},
		toolbar:{
			backgroundColor: "transparent",
		}
	}
}
export default compose(
	setDisplayName("We-Edit-UI"),
	connect(state=>({active:(getActive(state)||{}).doc})),
)(class extends PureComponent{
	static propTypes={
		titleBar:PropTypes.node,
		dashboard: PropTypes.node,
	}

	static defaultProps={
		titleBar:<TitleBar/>,
		dashboard: <Dashboard/>
	}

	state={}

	theme=getMuiTheme(styles.theme,this.props.theme, {fonts:this.props.fonts})

	componentDidCatch(error, info){
		this.setState({error:error.message})
	}

	getActiveWorkspace=memoize((children,active)=>{
		return Children.toArray(children).find(({props:{accept}})=>{
				if(typeof(accept)=="string"){
					let glob=accept
					accept=a=>minimatch(a.name||"",glob)
				}else if(accept
					&& accept.prototype
					&& accept.prototype instanceof Input.Viewable){
					let InputType=accept
					accept=a=>a.isTypeOf(InputType)
				}

				if(typeof(accept)=="function")
					return accept(active)

				return !!accept
			})
	})

	getNonWorkspaces=memoize((children)=>{
		let a=Children.toArray(children).filter(({props:{accept}})=>!accept)
		if(a.length)
			return a
		return null
	})

	rejectContextMenu(e){
		e.preventDefault()
		return false
	}

	render(){
		let {children,active, titleBar, dashboard, style, dispatch, titleBarProps, ...others}=this.props
		let activeWorkspace=null
		let nonWorkspaces=this.getNonWorkspaces(children)

		if(active){
			activeWorkspace=this.getActiveWorkspace(children,active)

			if(activeWorkspace){
				activeWorkspace=React.cloneElement(activeWorkspace, {doc:active, ...others, ...activeWorkspace.props})
			}else if(!nonWorkspaces){
				activeWorkspace=(<div>no editor for this document</div>)
			}
		}

		const {error}=this.state

		return (
			<MuiThemeProvider muiTheme={this.theme}>
				<div style={{...styles.root,...style}} onContextMenu={this.rejectContextMenu}>
					{titleBar && React.cloneElement(titleBar,{
						...titleBarProps,
						active,
						onMenu:a=>this.refs.dashboard.setState({display:true})
					})}

					{dashboard && React.cloneElement(dashboard,{
						ref:"dashboard",
						active,
						dispatch,
						zIndex:this.theme.zIndex.popover
					})}

					{activeWorkspace}

					{nonWorkspaces}

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
