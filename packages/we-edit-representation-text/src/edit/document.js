import React,{PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, getContext,setDisplayName} from "recompose"
import {when, getSelection} from "we-edit"
import {connect} from "react-redux"
import Html from "we-edit-representation-html/edit"

export default class  Document extends Html.Document{
	static childContextTypes={
		...Html.Document.childContextTypes,
		color:PropTypes.bool
	}

	getChildContext(){
		return {
			...super.getChildContext(),
			color:this.props.color,
		}
	}
	render(){
		return (
			<div style={{lineHeight:"140%",display:"flex", flexDirection:"collumn"}}>
				<LineNo ref={a=>this.no=a}/>
				<div style={{width:0}}/>
				<div style={{flex:"1 100%", marginLeft:4, position:"relative"}}>
					<CurrentLine/>
					{super.render()}
				</div>
			</div>
		)
	}
	
	updateLineNo(){
		const {line=true}=this.props
		let root=this.root

		if(line){
			let {height}=root.getBoundingClientRect()
			let {height:lineHeight}=root.querySelector("span[data-content]").getClientRects()[0]
			let lines=parseInt(height/lineHeight)
			this.no.setState({lines})
		}else{
			this.no.setState({lines:0})
		}
	}

	componentDidMount(){
		super.componentDidMount()
		this.updateLineNo()
	}

	componentDidUpdate(){
		super.componentDidUpdate()
		this.updateLineNo()
	}
}

class LineNo extends PureComponent{
	state={lines:0}
	render(){
		const {lines}=this.state
		return (
				<div style={{background:"lightgray", fontSize:"smaller"}}>
					{new Array(lines).fill(0).map((a,i)=>
						<div key={i} style={{textAlign:"right",marginRight:2, marginLeft:2}}>{i+1}</div>
					)}
				</div>
		)
	}
}

const CurrentLine=compose(
	setDisplayName("CurrentLine"),
	when("cursorPlaced", ({style:{canvasTop:top}, query})=>{
		return {top}
	}),
)(({top})=>(
	<div style={{position:"absolute",left:0,top,width:"100%",background:"lightblue"}}>
		&nbsp;
	</div>
))
