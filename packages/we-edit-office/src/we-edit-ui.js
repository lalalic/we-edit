import React, {PureComponent, Children, Fragment} from "react"
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
		titleBar:PropTypes.node
	}

	static defaultProps={
		titleBar:<TitleBar/>
	}

	state={}

	theme=getMuiTheme(styles.theme,this.props.theme, {fonts:this.props.fonts})

	componentDidCatch(error, info){
		this.setState({error})
	}

	render(){
		let {children,active, titleBar, style, dispatch, ...others}=this.props
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

			if(child){
				child=(
					<active.Store>
						{React.cloneElement(child, {...others, ...child.props})}
						<Runner ref="runner"/>
					</active.Store>
				)
			}else
				child=(<div>no editor for this document</div>)
		}

		const {error}=this.state

		const run=element=>this.refs.runner.setState({element})

		return (
			<MuiThemeProvider muiTheme={this.theme}>
				<div style={{...styles.root,...style}}>
					<TitleBar active={active}
						onMenu={()=>this.refs.dashboard.setState({display:true})}
						run={run}
						/>

					<Dashboard
						ref="dashboard"
						active={active}
						dispatch={dispatch}
						zIndex={this.theme.zIndex.popover}
						run={run}/>

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

class Runner extends PureComponent{
	state={element:null}
	render(){
		return <Fragment>{this.state.element}</Fragment>
	}
}
