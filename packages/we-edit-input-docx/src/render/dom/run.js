import React, {Component} from "react"
import PropTypes from "prop-types"


/**
 * rFonts decide run's font according to following specs:
 * check: https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oi29500/aef3c9a6-5d6c-434b-90b7-85e761fd8e62
 * 
 * 
 */
export default ({Container})=>class __$1 extends Component{
	static displayName="run"
	static propTypes={
		style: PropTypes.object.isRequired
	}

	static contextTypes={
		style: PropTypes.object,
		isHyperlinkTOC: PropTypes.bool,
	}

	static childContextTypes={
		style: PropTypes.object
	}

	getChildContext(){
		const {style}=this.props
		return {
			style: this.style(style, this.context.style)
		}
	}

	style=(direct, context)=>{
		if(this.context.isHyperlinkTOC && direct.basedOn=="Hyperlink"){
			direct=direct.clone()
			direct.basedOn=null
		}
		return direct.flat(context)
	}

	render(){
		const {style, ...props}=this.props
		return (<Container {...props} type={this.constructor.displayName}/>)
	}
}
