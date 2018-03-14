import React, {Component} from "react"
import PropTypes from "prop-types"

import {Provider,connect} from "react-redux"
import Immutable, {Map,Collection} from "immutable"
import {compose, setDisplayName, getContext,withContext} from "recompose"
import TestRenderer from 'react-test-renderer'
import {LocalStore} from "component/with-store"

import Components from "model"
import {createStore, createState, isState} from "state"
import {getContent,getSelection,getFile,getParentId, query} from "state/selector"
import undoable, {ACTION} from "state/undoable"
import * as reducer from "state/reducer"
import Input from "state/cursor/input"
import {Cursor,Stat} from "state/action"


import uuid from "tools/uuid"
import Type from "./type"

const supported=[]

export default {
	load(url){
		let Found=supported.find(TYPE=>TYPE.support(url))
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.load(url)).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit this type of file`)
		}
	},
	create(type){
		let Found=supported.find(TYPE=>TYPE.support(type))
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.create(type)).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot create this type of file`)
		}
	},

	support(...inputs){
		inputs.forEach(a=>{
			if(!supported.includes(a)){
				supported.push(a)
			}
		})
		return this
	},

	Type
}

function buildEditableDoc(doc,inputTypeInstance){
	const id=uuid()
	const Transformed=inputTypeInstance.transform(Components)
	inputTypeInstance.doc=doc
	
	const editableDoc={
		Transformed,
		toJSON(){
			return this.name
		},

		render(components){
			return inputTypeInstance.render((type, props, children)=>{
				return React.createElement(type,{...props,key:uuid()},children)
			},components)
		},
		
		getFontList(){
			return inputTypeInstance.getFontList()
		},
 
		Store:compose(
				setDisplayName("DocStore"),
				getContext({store:PropTypes.object}),
			)(({children,store:passedStore, style})=>{

			let onQuit=null
			let store=null
			if(passedStore){
				store=new LocalStore(passedStore, "we-edit", state=>state['we-edit'].docs[id].state)
			}else{
				store=createStore(editableDoc.buildReducer())
				onQuit=()=>inputTypeInstance.release()
			}

			let root=(
				<ContextProvider
					doc={editableDoc}
					onQuit={onQuit}
					renderUp={state=>inputTypeInstance.renderUp(state,Transformed )}
					transformer={inputTypeInstance.transform}
					style={style}
					>
					{children}
				</ContextProvider>
			)

			return (
				<Provider store={store}>
					{root}
				</Provider>
			)
		}),

		buildReducer(){
			let createElementFactory=createElementFactoryBuilder(inputTypeInstance)
			let changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance)
			let content=new Map().withMutations(a=>inputTypeInstance.render(createElementFactory(a),Components))

			let _reducer=undoable(changeReducer)
			let INIT_STATE=createState(doc,content)

			return (state,action={})=>state ? _reducer(state,action) : INIT_STATE
		},

		get name(){
			return inputTypeInstance.name
		},

		get id(){
			return id
		},

		save(name,option){
			name=name||inputTypeInstance.name
			inputTypeInstance.name=name
			return Promise.resolve(inputTypeInstance.serialize(option)).then(data=>{
				store.dispatch(ACTION.clear())
				if(typeof(document)!="undefined" && window.URL && window.URL.createObjectURL){
					let url = window.URL.createObjectURL(data)
					let link = document.createElement("a");
					document.body.appendChild(link)
					link.download = name
					link.href = url;
					link.click()
					document.body.removeChild(link)
					window.URL.revokeObjectURL(url)
				}else{
					return new Promise((resolve,reject)=>
						require("fs").writeFile(name,data,error=>{
							error ? reject(error) : resolve(data)
						})
					)
				}
			})
		},

		release(){
			return inputTypeInstance.release()
		}
	}

	return editableDoc
}
/*
the builder to create reducer
*/
const changeReducerBuilder=(createElementFactory,inputTypeInstance)=>
	(state,action,historyEntry)=>{
	switch(action.type){
	case "@@refresh":
		state.get("violent").changing=null
		return state.setIn(["content","refreshAt"],Date.now())
	default:
		break
	}

	let changedContent=state.get("content").asMutable()

	const createElement=createElementFactory(changedContent)

	inputTypeInstance.doc.renderChanged=node=>inputTypeInstance.renderNode(node,createElement)
	let changed=inputTypeInstance.onChange(
		state.set("_content", changedContent),
		action,
		createElement
	)

	if(changed===false){
		return state
	}else if(isState(changed)){
		return changed.remove("_content")
	}else if(typeof(changed)=="object"){
		let {selection,updated,undoables}=changed

		if(selection)
			state=state.mergeIn(["selection"], selection)

		if(undoables)
			historyEntry.changed=undoables

		state.get("violent").changing=updated

		state=state.setIn(["content"],changedContent.asImmutable())
	}else{
		state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))		
	}

	return state
}
/*
the builder to create a factory function
the factory function is to build content state as map and tree
node prototype: {type:string,props:{},children:[...id],parent:string}
*/
const createElementFactoryBuilder=inputTypeInstance=>content=>(type, props, children, raw)=>{
	let id
	if(type.displayName=="document"){
		id="root"
	}else{
		id=inputTypeInstance.makeId(raw)
	}

	content.set(id, Immutable.fromJS({
		type:type.displayName,
		id,
		props,
		children: !Array.isArray(children) ? children : children.map(a=>a.id)
	}))

	if(Array.isArray(children)){
		//set parent make map as a double direction tree structure
		children.forEach(k=>content.mergeIn([k.id],{parent:id}))
	}

	return {id,type,props,children}
}

class ContextProvider extends Component{
	static propTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func.isRequired,
		onQuit: PropTypes.func,
	}

	static childContextTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func,
		getCursorInput: PropTypes.func,
		//return {props(type){}}, to calculate selection props
		selected:PropTypes.func
	}
	
	static contextTypes={
		store: PropTypes.object
	}
	
	//to calculate selection props directly from composed
	selectedFromComposed(state,composed){
		if(!composed){
			return {
				props(){
					return null
				}
			}
		}
		
		const self=this
		
		let {cursorAt, ...sel}=getSelection(state)
		let {id,at}=sel[cursorAt]
		const TYPE=a=>a.constructor.displayName.split("-").pop()
		const current=composed.getComposer(id)
		return {
			props(type){
				if(type=="page"){
					return self.location
				}
				let found=current
				while(found){
					let foundType=TYPE(found)
					if(foundType==type)
						return found.props
					else{
						found=found.context.parent
					}
				}
				return null

				
			}
		}
	}
	
	//to calculate selection props from content by Type.renderUp
	selectedFromDoc(state){
		const self=this
		const {doc,renderUp}=this.props
		const Transformed=doc.Transformed
		const selection=getSelection(state)

		let {id,at}=selection[selection.cursorAt]

		let root=null
		try{
			root=TestRenderer.create(renderUp(state)).root
		}catch(e){
			root=TestRenderer.create(<div/>).root
		}
		
		const Type=type=>type[0].toUpperCase()+type.substr(1).toLowerCase()
		return {
			props(type){
				if(type=="page"){
					if(self.location){
						return self.location
					}else{
						return {
							page:0,
							column:0,
							line:0,
							id,at
						}
					}
				}
				
				try{
					let found=root.findByType(Transformed[Type(type)])
					return found.props
				}catch(e){
					return null
				}
			}
		}
	}

	getChildContext(){
		const self=this
		const doc=this.props.doc
		let composedDoc=null
		return {
			doc,
			transformer:this.props.transformer,
			getCursorInput(location,composedDocQuery){
				self.location=location
				composedDoc=doc.composed=composedDocQuery
				return self.refs.input
			},
			selected(state){
				if(composedDoc && composedDoc.getComposer)
					return self.selectedFromComposed(state,composedDoc)
				
				return self.selectedFromDoc(state)
			}
		}
	}
	
	componentDidMount(){
		const store=this.context.store
		const state=store.getState()
		const {start:{id,at}}=getSelection(state)
		store.dispatch(Cursor.AT(id,at))	
	}

	render(){
		const {children,style}=this.props
		return (
			<div style={style}>
				<Input ref="input"/>
				{children}
			</div>
		)
	}

	componentWillUnmount(){
		let {onQuit}=this.props
		if(onQuit)
			onQuit()
	}
}

