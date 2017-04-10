import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {getSelection} from "state/selector"


export class Selection extends Component{
	static displayName="selection"
	static propTypes={
		start:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired,
		end:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired,
		getRange: PropTypes.func
	}

	render(){
		const {start,end, getRange}=this.props
		let path=""
		if(start.id!=end.id || start.at!=end.at){
			path=getRange(start,end)
		}
		return <path d={path} fill="lightblue" style={{fillOpacity:0.5}}/>
	}
}

export default connect(state=>getSelection(state))(Selection)