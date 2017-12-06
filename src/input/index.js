import React, {Component} from "react"
import PropTypes from "prop-types"

import {Provider,connect} from "react-redux"
import Immutable, {Map,Collection} from "immutable"
import {compose, setDisplayName, getContext} from "recompose"

import {LocalStore} from "component/with-store"

import Components from "model"
import {createStore, createState, isState} from "state"
import {getContent,getSelection,getFile,getParentId, query} from "state/selector"
import * as reducer from "state/reducer"

import uuid from "tools/uuid"

import Type from "./type"

import undoable, {ACTION} from "state/undoable"

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
	inputTypeInstance.doc=doc
	let id=uuid()
	let store

	const Transformed=inputTypeInstance.transform(Components)
	let editableDoc={
		Transformed,

		toJSON(){
			return this.name
		},

		render(components){
			return inputTypeInstance.render((type, props, children)=>{
				return React.createElement(type,{...props,key:uuid()},children)
			},components)
		},

		selection(){
			return new Selection(editableDoc.getState(), inputTypeInstance)
		},

		Store:compose(
				setDisplayName("DocStore"),
				getContext({store:PropTypes.object}),
			)(({children,store:passedStore})=>{

			let onQuit=null
			if(passedStore){
				store=new LocalStore(passedStore, "we-edit", state=>state['we-edit'].docs[id].state)
			}else{
				store=createStore(editableDoc.buildReducer())
				onQuit=()=>inputTypeInstance.release()
			}

			let root=(
				<TransformerProvider
					doc={editableDoc}
					onQuit={onQuit}
					transformer={inputTypeInstance.transform}>
					{children}
				</TransformerProvider>
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

			let reducer=undoable(changeReducer)
			let INIT_STATE=createState(doc,content)

			return (state,action)=>state ? reducer(state,action) : INIT_STATE
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
		},

		getState(){
			return store.getState()
		},

		dispatch(){
			return store.dispatch(...arguments)
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



import Input from "state/cursor/input"
class TransformerProvider extends Component{
	static propTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func.isRequired,
		onQuit: PropTypes.func,
	}

	static childContextTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func,
		getCursorInput: PropTypes.func,
	}

	getChildContext(){
		const self=this
		return {
			doc: this.props.doc,
			transformer:this.props.transformer,
			getCursorInput(composedDoc){
				self.props.doc.composedDoc=composedDoc
				return self.refs.input
			}
		}
	}

	render(){
		return (
			<div>
				<Input ref="input"/>
				{this.props.children}
			</div>
		)
	}

	componentWillUnmount(){
		let {onQuit}=this.props
		if(onQuit)
			onQuit()
	}
}

import TestRenderer from 'react-test-renderer'
class Selection{
	constructor(state, inputInstance){
		const Transformed=inputInstance.transform(Components)
		const selection=getSelection(state)
		let {id,at}=selection[selection.cursorAt]

		const root=TestRenderer.create(inputInstance.buildUp(state,Transformed)).root
		
		const Type=type=>type[0].toUpperCase()+type.substr(1).toLowerCase()

		this.has=(type)=>{
			try{
				root.findByType(Transformed[Type(type)])
				return true
			}catch(e){
				return false
			}
		}

		//it can be construct from re-rendering, instead of parse composers along long way
		this.props=(type)=>{
			try{
				let found=root.findByType(Transformed[Type(type)])
				return found.props
			}catch(e){
				return {}
			}
		}		
		
	}
}
