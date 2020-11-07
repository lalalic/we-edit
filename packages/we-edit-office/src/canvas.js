import React,{Component} from  "react"
import {connect,whenSelectionChange} from "we-edit"
import {compose, setDisplayName} from "recompose"

import Ruler from "./ruler"
import {getOffice} from "./state/action"

const VerticalRuler=compose(
	setDisplayName("VerticalRuler"),
	whenSelectionChange(({selection})=>{
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

export default connect(state=>({scale:getOffice(state).scale}))(
class Canvas extends Component{
	constructor(){
		super(...arguments)
		this.state={}
	}

	render(){
		const {scale=100,ruler={vertical:true}, style={}, children}=this.props
		const {error}=this.state
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
				<div style={{flex:"1 100%", display:"flex", flexDirection:"column",width:"100%"}}>
					<div style={{flex:"1 100%",textAlign:"center"}}>
						{ruler && (
							<div style={{position:"sticky",top:0}}>
								<Ruler direction="horizontal" scale={scale/100}/>
							</div>
						)}
						{error ?  error.stack : children}
					</div>
				</div>

			</div>
		)
	}

	static getDerivedStateFromError(error){
		return {error}
	}
})
