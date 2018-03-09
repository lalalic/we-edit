import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withContext}  from "recompose"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const Zoom=compose(
	getContext({
		muiTheme: PropTypes.object
	})
)(
	({scale,muiTheme,children})=>{
		const customized={
			appBar:{
				height:parseInt(muiTheme.appBar.height*scale),
				//padding: parseInt(muiTheme.appBar.padding*scale)
			}
		}
		return (
			<div style={{}}>
				{children}
			</div>
		)
	}
)

export default Zoom
	
