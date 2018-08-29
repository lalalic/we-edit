import React,{Component,Fragment} from  "react"
import PropTypes from "prop-types"
import {compose, setDisplayName, getContext,withProps} from "recompose"

import Ruler from "./ruler"

const VerticalRuler=compose(
	setDisplayName("VerticalRuler"),
	getContext({
		selection: PropTypes.object
	}),
	withProps(({selection})=>{
		if(selection){
			let props=selection.props("page")
			if(props){
				return {
					pageY:props.pageY
				}
			}
		}
	})
)(({pageY=0, scale, ...props})=>{
	return (
		<div style={{position:"relative",width:0,top:pageY*scale}}>
			<Ruler direction="vertical" {...props} scale={scale}/>
		</div>
	)
})

export default class Canvas extends Component{
	render(){
		const {scale=100,ruler={vertical:true}, style={}, children}=this.props
		return (
			<div style={{
					overflow:"auto", flex:"1 100%",
					overflowY:ruler ? "scroll" : "auto",
					...style, 
					display:"flex", flexDirection:"column"
				}}>
				<div style={{flex:1, display:"flex", flexDirection:"row"}}>

					{ruler && (
						<Fragment>
							{ruler.vertical!==false && <VerticalRuler scale={scale/100} />}
							<div ref="rulerContainer" style={{position:"absolute",paddingTop:4}}>
								<Ruler direction="horizontal" scale={scale/100}/>
							</div>
						</Fragment>
					)}

					<div ref="contentContainer" 
						style={{flex:"1 100%", textAlign:"center", margin:"4px auto auto auto",}}>
						<div style={{margin:"auto",display:"inline-block", textAlign:"initial"}}>
							{children}
						</div>
					</div>
				</div>

			</div>
		)
	}
	
	setupHorizontalRuler(){
		const {ruler=true}=this.props
		if(!ruler)
			return
		
		const {rulerContainer, contentContainer}=this.refs
		if(rulerContainer && contentContainer){
			rulerContainer.style.width=contentContainer.getBoundingClientRect().width+"px"
		}
	}

	componentDidMount(){
		this.setupHorizontalRuler()
	}

	componentDidUpdate(){
		this.setupHorizontalRuler()
	}
}