import React,{Component,Fragment} from  "react"
import PropTypes from "prop-types"
import {connect, getSelectionStyle} from "we-edit"
import {compose, setDisplayName, withProps} from "recompose"

import Ruler from "./ruler"

const VerticalRuler=compose(
	setDisplayName("VerticalRuler"),
	connect(state=>({selection: getSelectionStyle(state)})),
	withProps(({selection})=>{
		if(selection){
			let props=selection.props("page",false)
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
					overflowY:"scroll",
					...style,
					display:"flex", flexDirection:"row"
				}}>
				{ruler && ruler.vertical!==false && (
					<div style={{flex:1, paddingTop:horizontalRulerHeight}}>
						<VerticalRuler scale={scale/100} />
					</div>
				)}
				<div ref={a=>this.a=a} style={{flex:"1 100%", display:"flex", flexDirection:"column"}}>

					{ruler && (
						<div style={{position:"sticky",top:0}}>
							<Ruler direction="horizontal" scale={scale/100}/>
						</div>
					)}

					<div ref={b=>this.b=b} style={{flex:"1 100%"}}>
						{children}
					</div>
				</div>

			</div>
		)
	}

	componentDiDMount(){
		this.a.style.minHeight=this.b.getBoundingClientRect().height+'px'
	}
	componentDidUpdate(){
		this.a.style.minHeight=this.b.getBoundingClientRect().height+'px'
	}
}
