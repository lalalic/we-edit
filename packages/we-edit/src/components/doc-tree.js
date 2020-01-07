import React,{Component, Fragment} from "react"
import PropTypes from "prop-types"
import minimatch from "minimatch"
import memoize from "memoize-one"
import {connect} from "../state"
import {getSelection} from "../state/selector"
import {Selection} from "../state/action"

class Node extends Component{
	state={show:true}

	shouldComponentUpdate({content},{show}){
		return !content.equals(this.props.content) || show!=this.state.show
	}

	render(){
		const {props:{name,id, children, dispatch, textContent,onClick,content,style,...props},state:{show}}=this
		const childrenNodes=children && Array.isArray(children) && (
			<dl style={{marginLeft:15, marginTop:0, marginBottom:0, display: show ? "" : "none"}}>
				{children}
			</dl>
		)

		return (
			<Fragment>
				{!name ? null : 
				<dt {...props} style={{...style, userSelect:"none"}}>
					<span
						onClick={e=>this.setState({show:!show})}
						style={{display:"inline-block",width:20,textAlign:"center"}}>
						{!!childrenNodes && (show ? "-" : "+")}
					</span>
					<span onClick={e=>{
						if(onClick)
							onClick(e)
						else if(typeof(textContent)=="string"){
							dispatch(Selection.SELECT(id,0,id,textContent.length))
						}else{
							dispatch(Selection.SELECT(id))
						}
					}}  id={`_docNode_${id}`}>
						{name}
					</span>
				</dt>
				}
				{childrenNodes}
			</Fragment>
		)
	}
}


export default connect(state=>({content:state.get("content")}))(class DocumentTree extends Component{
	static propTypes={
		content: PropTypes.any,
		node: PropTypes.element,
		toNodeProps: PropTypes.func
	}

	static defaultProps={
		toNodeProps: (({id,type,props})=>({id,name:type})),
		node:<Node/>
	}

	shouldComponentUpdate({content,filter}){
		return !content.equals(this.props.content) || filter!=this.props.filter
	}

	render(){
		const  {content, filter="*", filterFn=this.getFilter(filter), children, node=children,  toNodeProps,dispatch}=this.props
		const doc=this.constructor.createDocument(content, filterFn,(id, type,props,children)=>
			React.cloneElement(node,{
				...toNodeProps({id,type,props}),
				content:content.get(id),
				dispatch,
				key:id,
				id,
				children,
				textContent: typeof(children)=="string" ? children: undefined
			})
		)

		return (
			<Fragment>
				{doc.props.children}
				<Focus/>
			</Fragment>
		)
	}

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
			if(content.has(id)){
				const current=content.get(id).toJS()
				let {type, props, children}=current
				if(id=="root" || filter(current)){
					return createNode(id, type, props,Array.isArray(children) ? create4Children(children) : children)
				}else{
					return Array.isArray(children) ? create4Children(children) : null
				}
			}else{
				debugger
				return null
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

const Focus=connect(state=>{
	const {cursorAt, ...a}=getSelection(state)
	if(a[cursorAt]){
		const {id:focus}=a[cursorAt]
		return {focus}
	}
	return {}
})(class $_ extends Component{
	shouldComponentUpdate({focus}){
		return focus!=this.props.focus
	}

	render(){
		return <span/>
	}

	componentDidMount(){
		const node=document.getElementById(`_docNode_${this.props.focus}`)
		node && (node.style.background="lightblue");
	}

	componentDidUpdate({focus}){
		const last=document.getElementById(`_docNode_${focus}`);
		last && (last.style.background="");
		
		this.componentDidMount()
	}
})