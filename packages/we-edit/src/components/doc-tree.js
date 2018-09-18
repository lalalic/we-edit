import React,{PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {getContext,compose,setDisplayName} from "recompose"
import minimatch from "minimatch"
import memoize from "memoize-one"
import {getActive} from "./we-edit"

export default compose(
	setDisplayName("DocumentTree"),
	getContext({
		selection:PropTypes.any,
	}),
	connect((state,{store})=>{
		const content=getActive(state).state.get("content")
		return {content}
	}),
	
)(class extends PureComponent{
	static propTypes={
		content: PropTypes.any,
		selection:  PropTypes.any,
		node: PropTypes.element,
	}
	
	render(){
		const {content, filter="*", children, node=children}=this.props
		const doc=this.getDocument(content, filter, node)
		return (
			<Fragment>
				{doc.props.children}
			</Fragment>
		)
	}
	
	getDocument=memoize((content, filter,  node=<DL/>)=>{
		filter=this.getFilter(filter)
		const createNode=(type,props,children)=>React.cloneElement(node,{type,props,children})
		return this.constructor.createDocument(content, filter,createNode)
	})
	
	getFilter=memoize(filter=>{
		if(typeof(filter)=="string"){
			let glob=filter
			filter=a=>minimatch(a.type||"",glob)
		}

		if(typeof(filter)=="function")
			return filter

		return a=>!!filter
	})
	
	static createDocument(content, filter, createNode){
		const createElement=id=>{
			let current=content.get(id).toJS()
			let {type, props, children}=current
			if(id=="root" || filter(current)){
				return createNode(
					type, props, 
					Array.isArray(children) ? create4Children(children) : children
				)
			}else{
				return Array.isArray(children) ? create4Children(children) : null
			}
		}
		
		const create4Children=children=>{
				children=children.map(a=>createElement(a))
				.filter(a=>!!a && (Array.isArray(a) ? a.length>0 : true))
				.reduce((all,a)=>{
					if(Array.isArray(a)){
						all.splice(all.length,0,...a)
					}else{
						all.splice(all.length,0,a)
					}
					return all
				},[])
				return children.length==0 ? null : children
		}
		
		return createElement("root")
	}
})

class DL extends PureComponent{
	state={show:true}
	render(){
		let {type,children}=this.props
		const {show}=this.state
		if(children){
			if(Array.isArray(children)){
				children=(
					<dl style={{marginLeft:15, marginTop:0, marginBottom:0, display: show ? "" : "none"}}>
						{children}
					</dl>
				)
			}else if(typeof(children)=="string"){
				children=null
			}
		}
		return (
			<Fragment>
				{type &&
				<dt style={{userSelect:"none"}}>
					<span 
						onClick={e=>this.setState({show:!show})} 
						style={{display:"inline-block",width:20,textAlign:"center"}}>
						{!!children && (show ? "-" : "+")}
					</span>
					<span>{type}</span>
				</dt>
				}
				{children}
			</Fragment>
		)
	}
}