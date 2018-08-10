import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,setDisplayName}  from "recompose"
import minimatch from "minimatch"

import {Snackbar} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TitleBar from "./title-bar"
import Dashboard from "./dashboard"
import {getActive} from "we-edit"
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
		this.setState({error})
	}

	render(){
		let {children,active, titleBar, dashboard, style, dispatch, titleBarProps, ...others}=this.props
		children=Children.toArray(children)
		let child=null
		if(active){
			child=children.find(({props:{accept}})=>{
					if(typeof(accept)=="string"){
						let glob=accept
						accept=a=>minimatch(a.name,glob)
					}

					if(typeof(accept)=="function")
						return accept(active)

					return false
				})

			if(child){
				child=React.cloneElement(child, {doc:active, ...others, ...child.props})
			}else
				child=(<div>no editor for this document</div>)
		}else{
			child=children.filter(({props:{accept}})=>!accept)
		}

		const {error}=this.state

		return (
			<MuiThemeProvider muiTheme={this.theme}>
				<div style={{...styles.root,...style}}>
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

					{child}

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

	componentDidCatch(error){
		this.setState({error:error.message})
	}
})
