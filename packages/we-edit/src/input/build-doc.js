import React from "react"
import PropTypes from "prop-types"

import Immutable, {Map} from "immutable"
import {compose, setDisplayName, getContext} from "recompose"
import memoize from "memoize-one"

import Dom from "../dom"
import {createStore, createState, isState, Provider} from "../state"
import {getSelection} from "../state/selector"
import undoable from "../state/undoable"
import * as reducer from "../state/reducer"

import uuid from "../tools/uuid"
import ContextProvider from "./context-provider"

export default function buildDoc(doc,inputTypeInstance){
	const id=uuid()
	const transform=inputTypeInstance.transform.bind(inputTypeInstance)
	const TypedComponents=transform(Dom)

	const getDocStore=memoize((store,id)=>new LocalStore(store, "we-edit", state=>state['we-edit'].docs[id].state))

	const buildReducer=(extendReducer=a=>a)=>{
		let createElementFactory=createElementFactoryBuilder(inputTypeInstance)
		let changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance,TypedComponents)
		let content=new Map().withMutations(a=>inputTypeInstance.render(createElementFactory(a),TypedComponents))

		let _reducer=undoable(changeReducer)
		let INIT_STATE=createState(inputTypeInstance,content)

		return (state=INIT_STATE,action={type:"we-edit/init"})=>{
			state=_reducer(state,action)
			state=state.set("statistics", reducer.statistics(state.get("statistics"),action))
			state=state.set("ui", reducer.ui(state.get("ui"),action))
			return extendReducer(state,action)
		}
	}

	const Store=compose(
			setDisplayName("DocStore"),
			getContext({store:PropTypes.any}),
		)(({children,store,release=true,reducer,...props})=>{
		let onQuit=null
		if(store){
			store=getDocStore(store,id)
		}else{
			store=createStore(buildReducer(reducer))
			onQuit=()=>inputTypeInstance.release()
		}

		return (
			<Provider store={store}>
				<ContextProvider
					doc={inputTypeInstance}
					onQuit={release ? onQuit : null}
					transformer={transform}
					{...props}
					>
					{children}
				</ContextProvider>
			</Provider>
		)
	})

	return Object.assign(inputTypeInstance,{
		id,doc,buildReducer,Store,
		toJSON(){
			return this.name
		}
	})
}
/*
the builder to create reducer
*/
const changeReducerBuilder=(createElementFactory,inputTypeInstance,TypedComponents)=>(state,action,historyEntry)=>{
	switch(action.type){
	case "we-edit/refresh":
		return state.setIn(["content","root","props","key"],Date.now())
	default:
		break
	}

	const mutableContent=state.get("content").asMutable()
	const mutableState=state.set("_content", mutableContent)

	const createElement=createElementFactory(mutableContent)

	inputTypeInstance.renderChanged=node=>inputTypeInstance.renderNode(node,createElement,TypedComponents)

	try{
		if(typeof(inputTypeInstance.startTransaction)=="function"){
			inputTypeInstance.startTransaction()
		}
		
		if(typeof(inputTypeInstance.onChange)=="function"){
			const changed=inputTypeInstance.onChange(mutableState,action)
			if(changed===false){
				return state
			}else if(isState(changed)){
				state=changed.remove("_content")
			}else if(typeof(changed)=="object"){
				const {selection}=changed
				if(selection){
					state=state.mergeIn(["selection"], selection)
				}
				state=state.setIn(["content"],mutableContent.asImmutable())
			}else{
				state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))
			}
			if(typeof(inputTypeInstance.commit)=="function"){
				historyEntry.patches=inputTypeInstance.commit()
			}
		}
	}catch(e){
		console.error(e)
		if(typeof(inputTypeInstance.rollback)=="function"){
			inputTypeInstance.rollback()
		}
	}finally{
		return state
	}
}
/*
the builder to create a factory function
the factory function is to build content state as map and tree
node prototype: {type:string,props:{},children:[...id],parent:string}
*/
const createElementFactoryBuilder=inputTypeInstance=>content=>(type, props, children, raw)=>{
	if(!type){
		return props
	}
	const id=inputTypeInstance.makeId(raw)
	const node={
		type:type.displayName,
		id,
		props,
		children: !Array.isArray(children) ? children : children.map(a=>a.id)
	}

	if(content.hasIn([id,"parent"])){
		node.parent=content.getIn([id,"parent"])
	}

	content.set(id, Immutable.fromJS(node))

	if(!id){
		console.error(node)
	}
	

	if(Array.isArray(children)){
		//set parent make map as a double direction tree structure
		children.forEach(k=>content.mergeIn([k.id],{parent:id}))
	}

	return {id,type,props,children}
}


class LocalStore{
	constructor(store,key, getState){
		this.key=key
		this.listeners=[]
		this.getState=()=>{
			try{
				if(getState){
					return getState(store.getState())
				}
				return store.getState()[key]
			}catch(e){
				return {}
			}
		}

		this.dispatch=action=>{
			if(typeof(action)=="function"){
				return action(this.dispatch, this.getState)
			}
			this.listeners.forEach(a=>a(action))
			return store.dispatch(action)
		}
		this.listen=fn=>{
			this.listeners.push(fn)
			return ()=>{
				const i=this.listeners.indexOf(fn)
				if(i!=-1){
					this.listeners.splice(i,1)
				}
			}
		}
		this.subscribe=store.subscribe.bind(store)
		this.replaceReducer=store.replaceReducer.bind(store)
	}
}
