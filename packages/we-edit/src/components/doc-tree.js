import React,{PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {getContext,compose,setDisplayName} from "recompose"
import minimatch from "minimatch"
import memoize from "memoize-one"
import {connect} from "../state"
import {getSelection,getParentId} from "../state/selector"
import {Selection} from "../state/action"


const DL=connect(state=>{
	const content=state.get("content")
	const {cursorAt, ...selection}=getSelection(state)
	const {id}=selection[cursorAt]
	return {focus:id}
})(class DL extends PureComponent{
	state={show:true}
	render(){
		let {name,id, children, isFocus, focus, dispatch, textContent,
			onClick=a=>{
				if(textContent){
					dispatch(Selection.SELECT(id,0,id,textContent.length-1))
				}else{
					dispatch(Selection.SELECT(id))
				}
			},
			...props}=this.props

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
		props.style={...props.style, userSelect:"none"}
		let typeStyle={}
		if(isFocus(focus)){
			typeStyle.background="lightblue"
		}
		return (
			<Fragment>
				{name &&
				<dt {...props}>
					<span
						onClick={e=>this.setState({show:!show})}
						style={{display:"inline-block",width:20,textAlign:"center"}}>
						{!!children && (show ? "-" : "+")}
					</span>
					<span style={typeStyle} onClick={onClick}>
						{name}
					</span>
				</dt>
				}
				{children}
			</Fragment>
		)
	}
})

export default compose(
	setDisplayName("DocumentTree"),
	connect((state)=>{
		const content=state.get("content")
		return {content}
	}),
)(class extends PureComponent{
	static propTypes={
		content: PropTypes.any,
		node: PropTypes.element,
		toNodeProps: PropTypes.func
	}

	render(){
		const {content, filter="*", children, node=children,  toNodeProps}=this.props
		const doc=this.getDocument(content, filter, node, toNodeProps)
		return (
			<Fragment>
				{doc.props.children}
			</Fragment>
		)
	}

	getFocus=memoize((content, filter, focus)=>{
		if(content.has(focus)){
			filter=this.getFilter(filter)
			let current=focus
			while(current && !filter(content.get(current).toJS())){
				current=getParentId(content, current)
			}
			if(current){
				return content.get(current).toJS()
			}
		}

		return null
	})

	getDocument=memoize((content, filter,  node, toNodeProps)=>{
		node=node||<this.constructor.Node/>
		const isFocus=id=>focus=>{
			let thisFocus=this.getFocus(content,filter,focus)
			if(thisFocus){
				return thisFocus.id==id
			}
			return false
		}
		toNodeProps=toNodeProps||(({id,type,props})=>({id,name:type}))
		const createNode=(id, type,props,children)=>{
			return React.cloneElement(node,{
				...toNodeProps({id,type,props}),
				key:id,
				id,
				children,
				isFocus:isFocus(id),
				textContent: typeof(children)=="string" ? children: undefined
			})
		}
		return this.constructor.createDocument(content, this.getFilter(filter),createNode)
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
					id, type, props,
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

	static Node=DL
})
