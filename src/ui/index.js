import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName}  from "recompose"
import minimatch from "minimatch"

import {Snackbar} from "material-ui"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TitleBar from "we-edit-ui/title-bar"
import {getActive} from "we-edit"
import {grey50 as BACKGROUND} from "material-ui/styles/colors"

require("./style.less")


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
	connect(state=>({active:getActive(state).doc})),
)(class extends PureComponent{
	static propTypes={
		titleBar:PropTypes.node
	}

	static defaultProps={
		titleBar:<TitleBar/>
	}

	state={}

	theme=getMuiTheme(styles.theme,this.props.theme)

	componentDidCatch(error, info){
		this.setState({error})
	}

	render(){
		let {children,active, titleBar, style}=this.props
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
				child=React.cloneElement(child, {doc:active})
			else
				child=(<div>no editor for this document</div>)
		}

		const {error}=this.state

		return (
			<MuiThemeProvider muiTheme={this.theme}>
				<div style={{...styles.root,...style}}>
					{titleBar}
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

export {default as Workspace} from "./workspace"
