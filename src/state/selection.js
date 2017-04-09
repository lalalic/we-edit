import React, {Component, PropTypes} from "react"
export default class Selection extends Component{
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
		return null
	}

	componentDidMount(){
		this.selection=window.getSelection()||document.getSelection()
	}

	componentDidUpdate(){
		const {start,end,getRange}=this.props
		this.selection.removeAllRanges()
		this.selection.addRange(getRange(start,end))
	}
}
