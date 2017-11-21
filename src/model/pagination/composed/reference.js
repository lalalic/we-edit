import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"


import Group from "./group"

export default class Reference extends Group{
	static propTypes={
		from:PropTypes.number,
		to:PropTypes.number
	}
	
	render(){
		const {from=-1,to}=this.props
		if(from<0){
			return React.Children.only(this.props.children)
		}else{
			return <Group {...this.props}>{React.Children.asArray(this.props.children).slice(from,to)}</Group>
		}
	}
}