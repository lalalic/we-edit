import React,{PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, getContext} from "recompose"
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
				{React.cloneElement(super.render(),{style:{flex:"1 100%", marginLeft:4}})}
			</div>
		)
	}

	componentDidMount(){
		const {line=true}=this.props
		let root=this.root.querySelector("article")
		if(line){
			let {height}=root.getBoundingClientRect()
			let {height:lineHeight}=root.querySelector("span[data-content]").getClientRects()[0]
			let lines=parseInt(height/lineHeight)
			this.no.setState({lines})
		}else{
			this.no.setState({lines:0})
		}
	}

	componentDidUpdate(){
		this.componentDidMount()
	}
}

class LineNo extends PureComponent{
	state={lines:0,lineHeight:0,current:0}
	render(){
		const {lines}=this.state
		return (
			<div style={{background:"lightgray"}}>
				{new Array(lines).fill(0).map((a,i)=>
					<div key={i} style={{textAlign:"right",marginRight:2, marginLeft:2}}>{i+1}</div>
				)}
			</div>
		)
	}
}

const CurrentLine=compose(
	getContext({query:PropTypes.func},({query})=>({query})),
	connect((state,{query})=>{
		let {cursorAt, ...a}=getSelection(state)
		return {cursor:a[cursorAt]}
	}),
	when("cursorPlaced",({cursor:{id,at}, query})=>{
		debugger
		return {}
	}),
)(({top})=>(<div style={{position:"absolute",left:0,top,width:"100%",background:"lightblue"}}>&nbsp;</div>))
