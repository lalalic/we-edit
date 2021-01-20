import React, {Component} from "react"
import PropTypes from "prop-types"


/**
 * rFonts decide run's font according to following specs:
 * check: https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oi29500/aef3c9a6-5d6c-434b-90b7-85e761fd8e62
 {
	ascii:
	0000 – 007F,FE70 – FEFE,0590 – 05FF,0600 – 06FF,0700 – 074F,0750 – 077F,0780 – 07BF
	ea:
	1100 – 11FF,2F00 – 2FDF,2FF0 – 2FFF,3000 – 303F,3040 – 309F,30A0 – 30FF,3100 – 312F,3130 – 318F,
	3190 – 319F,3200 – 32FF,3300 – 33FF,3400 – 4DBF,4E00 – 9FAF,A000 – A48F,A490 – A4CF,AC00 – D7AF,
	D800 – DB7F,DB80 – DBFF,DC00 – DFFF,F900 – FAFF,FE30 – FE4F,FE50 – FE6F,,FF00 – FFEF
 }
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
