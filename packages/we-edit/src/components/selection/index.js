import React, {Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {getSelection,getContent} from "we-edit/state/selector"

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
		getContent: PropTypes.func
	}

	static defaultProps={
		start:{id:"",at:0},
		end:{id:"",at:0}
	}

	el=null
	render(){
		const {children,  ...others}=this.props
		return React.cloneElement(React.Children.only(children),{...others})
	}
}

const SelectionHolder=connect(state=>{
	return {
		...getSelection(state),
		getContent(id){
			return getContent(state,id).toJS()
		}
	}
}, null, null, {withRef:true})(Selection)


export default class extends Component{
	forceUpdate(){
		if(this.selection)
			this.selection.forceUpdate()
	}

	render(){
		return (
			<SelectionHolder
				ref={a=>{a && (this.selection=a.getWrappedInstance())}}
				{...this.props}/>
			)
	}
}
