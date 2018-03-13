import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {getContext}  from "recompose"
import Ruler from "we-edit-ui/ruler"

export default class Canvas extends PureComponent{
	render(){
		return (
			<div style={{display:"flex", flexDirection:"row"}}>

				<VerticalRuler/>

				<div ref="rulerContainer" style={{position:"absolute",paddingTop:4, background:"lightgray"}}>
					<Ruler direction="horizontal"/>
				</div>

				<div ref="contentContainer" style={{flex:"1 100%", textAlign:"center", margin:"4px auto auto auto"}}>
					<div style={{margin:"auto",display:"inline-block"}}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.refs.rulerContainer.style.width=this.refs.contentContainer.getBoundingClientRect().width+"px"
	}
}

const VerticalRuler=getContext({
	selection: PropTypes.object
})(({selection})=>{
	let {pageY:top}=selection.props("page")
	return (
		<div style={{position:"relative",width:0,top}}>
			<Ruler direction="vertical"/>
		</div>
	)
})
