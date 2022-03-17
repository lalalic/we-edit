import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

export default ({Cell})=>class __$1 extends Component{
	static displayName="cell"
	static contextTypes={
		style: PropTypes.object
	}

	static childContextTypes={
		style: PropTypes.object
	}

	childStyle=memoize((direct,context)=>{
		return direct.mixin(context)
	})

	getChildContext(){
		return {style:this.childStyle(this.props.style, this.context.style)}
	}

	render(){
		const {style:$1,...props}=this.props
		const childStyle=this.childStyle(this.props.style, this.context.style)
		const style=childStyle.flat4Cell()
		props.colSpan=$1.tc?.colSpan
		return <Cell {...{...props,...style}}/>
	}
}
