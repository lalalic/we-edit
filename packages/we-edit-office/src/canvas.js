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
		<div style={{position:"relative",top:pageY*scale}}>
			<Ruler direction="vertical" {...props} scale={scale}/>
		</div>
	)
})

export default class Canvas extends Component{
	render(){
		const {scale=100,ruler={vertical:true}, style={}, children}=this.props
		const horizontalRulerHeight=20
		return (
			<div style={{
					overflow:"auto", flex:"1 100%",
					overflowY:ruler ? "scroll" : "auto",
					...style, 
					display:"flex", flexDirection:"row"
				}}>
				{ruler && ruler.vertical!==false && (
					<div style={{flex:1, paddingTop:20+4}}>
						<VerticalRuler scale={scale/100} />
					</div>
				)}
				<div style={{flex:"1 100%", display:"flex", flexDirection:"column"}}>

					{ruler && (
						<div style={{paddingTop:2, paddingBottom:2}}>
							<Ruler direction="horizontal" scale={scale/100}/>
						</div>
					)}
					
					<div style={{flex:"1 100%", margin:"0px auto"}}>
						{children}
					</div>
				</div>

			</div>
		)
	}
}