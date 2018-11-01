import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Immutable, {Map,Collection} from "immutable"
import {compose, setDisplayName, getContext,withContext} from "recompose"
import memoize from "memoize-one"

import Components from "../model"
import {createStore, createState, isState, Provider} from "../state"
import {getSelection} from "../state/selector"
import undoable from "../state/undoable"
import * as reducer from "../state/reducer"

import uuid from "../tools/uuid"
import ContextProvider from "./context-provider"

export default function buildEditableDoc(doc,inputTypeInstance){
	const id=uuid()
	const Transformed=inputTypeInstance.transform(Components)
	inputTypeInstance.doc=doc
	let store=null

	const getDocStore=memoize((store,id)=>new LocalStore(store, "we-edit", state=>state['we-edit'].docs[id].state))

	const editableDoc={
		Transformed,

		editable(){
			return !!inputTypeInstance.onChange
		},

		toJSON(){
			return this.name
		},

		getFontList(){
			return inputTypeInstance.getFontList()
		},

		Store:compose(
				setDisplayName("DocStore"),
				getContext({store:PropTypes.object}),
			)(({children,store:passedStore,release=true,reducer,...props})=>{

			let onQuit=null
			if(passedStore){
				store=getDocStore(passedStore,id)
			}else{
				store=createStore(editableDoc.buildReducer(reducer))
				onQuit=()=>inputTypeInstance.release()
			}

			return (
				<Provider store={store}>
                    <ContextProvider
                        doc={editableDoc}
                        onQuit={release ? onQuit : null}
                        transformer={inputTypeInstance.transform}
                        {...props}
                        >
                        {children}
                    </ContextProvider>
				</Provider>
			)
		}),



		buildReducer(extendReducer=a=>a){
			let createElementFactory=createElementFactoryBuilder(inputTypeInstance)
			let changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance)
			let content=new Map().withMutations(a=>inputTypeInstance.render(createElementFactory(a),Components))

			let _reducer=undoable(changeReducer)
			let INIT_STATE=createState(doc,content)

			return (state=INIT_STATE,action={})=>{
				state=_reducer(state,action)
				state=state.set("statistics", reducer.statistics(state.get("statistics"),action))
				state=state.set("ui", reducer.ui(state.get("ui"),action))
				return extendReducer(state,action)
			}
		},

		get name(){
			return inputTypeInstance.name||(inputTypeInstance.props && inputTypeInstance.props.name)
		},

		get id(){
			return id
		},

		get type(){
			return inputTypeInstance.getType()
		},

		get typeName(){
			return inputTypeInstance.getTypeName()
		},

		get typeExt(){
			return inputTypeInstance.getTypeExt()
		},

		get mimeType(){
			return inputTypeInstance.getTypeMimeType()
		},

		stream(option){
			return inputTypeInstance.stream(option)
		},

		release(){
			return inputTypeInstance.release()
		},

		isTypeOf(InputType){
			return inputTypeInstance instanceof InputType
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
	console.assert(!!type)
	let id=inputTypeInstance.makeId(raw)

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


class LocalStore{
	constructor(store,key, getState){
		this.key=key
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
			return store.dispatch(action)
		}
		this.subscribe=store.subscribe.bind(store)
		this.replaceReducer=store.replaceReducer.bind(store)
	}
}
