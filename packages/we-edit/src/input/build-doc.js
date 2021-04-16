import React, {PureComponent} from "react"
import PropTypes from "prop-types"

import Immutable, {Map} from "immutable"
import memoize from "memoize-one"

import Dom from "../dom"
import {createStore, createState, isState, Provider} from "../state"
import {getSelection} from "../state/selector"
import undoable from "../state/undoable"
import * as reducer from "../state/reducer"

import uuid from "../tools/uuid"
import ContextProvider from "./context-provider"

export default function buildDoc(doc,inputTypeInstance){
	const id=inputTypeInstance.props?.id || uuid()
	const transform=memoize(components=>inputTypeInstance.transform.call(inputTypeInstance,components))
	const TypedComponents=transform(Dom)

	const getDocStore=memoize((store,id)=>new LocalStore(store, "we-edit", state=>state['we-edit'].docs[id]?.state))

	const buildReducer=(extendReducer=a=>a)=>{
		const createElementFactory=createElementFactoryBuilder(inputTypeInstance)
		const changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance,TypedComponents)
		const content=new Map().withMutations(a=>inputTypeInstance.render(createElementFactory(a),TypedComponents))

		const _reducer=undoable(changeReducer)
		const INIT_STATE=createState(inputTypeInstance,content)

		return (state=INIT_STATE,action={type:"we-edit/init"})=>{
			state=_reducer(state,action)
			if(inputTypeInstance.props?.reduce){
				state=inputTypeInstance.props.reduce(state,action)
			}
			state=state.set("statistics", reducer.statistics(state.get("statistics"),action))
			state=state.set("ui", reducer.ui(state.get("ui"),action))
			return extendReducer(state,action)
		}
	}

	class Store extends PureComponent{
		static contextTypes={
			store: PropTypes.any
		}
		
		constructor({reducer},{store}){
			super(...arguments)
			this.store=store ? getDocStore(store, id) : createStore(buildReducer(reducer))
		}
	
		render(){
			const {children, release=true, ...props}=this.props
			return (
				<Provider store={this.store}>
					<ContextProvider
						doc={inputTypeInstance}
						onQuit={()=>release && inputTypeInstance.release()}
						transformer={transform}
						{...props}
						>
						{children}
					</ContextProvider>
				</Provider>
			)			
		}
	}

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
	case "we-edit/content/ASYNC":{
		return state.updateIn(["content"], a=>a.withMutations(b=>{
				inputTypeInstance.renderNode(action.payload, createElementFactory(b),TypedComponents)
			}))
	}
	default:
		break
	}
	if(typeof(inputTypeInstance.onChange)!=="function")
		return state

	try{
		if(typeof(inputTypeInstance.startTransaction)=="function"){
			inputTypeInstance.startTransaction()
		}
		
		const mutableContent=state.get("content").asMutable()
		const mutableState=state.set("_content", mutableContent)
		const createElement=createElementFactory(mutableContent)
		
		inputTypeInstance.renderChanged=node=>inputTypeInstance.renderNode(node,createElement,TypedComponents)
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
	}catch(e){
		console.error(e)
		if(typeof(inputTypeInstance.rollback)=="function"){
			inputTypeInstance.rollback()
		}
	}finally{
		//@TODO: renderChanged should not be called out of onChange
		//inputTypeInstance.renderChanged=()=>console.warn("you should not call .renderChanged out of onChange")
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
		children.forEach(k=>content.setIn([k.id,'parent'],id))
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
