import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import {Provider,connect} from "react-redux"
import Immutable, {Map,Collection} from "immutable"
import {compose, setDisplayName, getContext,withContext} from "recompose"

import Components from "../model"
import {createStore, createState, isState} from "../state"
import {getSelection} from "../state/selector"
import undoable from "../state/undoable"
import * as reducer from "../state/reducer"

import {LocalStore} from "../components/with-store"
import uuid from "../tools/uuid"
import ContextProvider from "./context-provider"

export default function buildEditableDoc(doc,inputTypeInstance){
	const id=uuid()
	const Transformed=inputTypeInstance.transform(Components)
	inputTypeInstance.doc=doc
	let store=null

	const editableDoc={
		Transformed,

		toJSON(){
			return this.name
		},

		getFontList(){
			return inputTypeInstance.getFontList()
		},

		Store:compose(
				setDisplayName("DocStore"),
				getContext({store:PropTypes.object}),
			)(({children,store:passedStore,release,reducer,...props})=>{

			let onQuit=null
			if(passedStore){
				store=new LocalStore(passedStore, "we-edit", state=>state['we-edit'].docs[id].state)
			}else{
				store=createStore(editableDoc.buildReducer(reducer))
				onQuit=()=>inputTypeInstance.release()
			}

			return (
				<Provider store={store}>
                    <ContextProvider
                        doc={editableDoc}
                        onQuit={release ? onQuit : null}
                        renderUp={state=>inputTypeInstance.renderUp(state,Transformed )}
                        transformer={inputTypeInstance.transform}
                        {...props}
                        >
                        {children}
                    </ContextProvider>
				</Provider>
			)
		}),

		buildReducer(reducer=a=>a){
			let createElementFactory=createElementFactoryBuilder(inputTypeInstance)
			let changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance)
			let content=new Map().withMutations(a=>inputTypeInstance.render(createElementFactory(a),Components))

			let _reducer=undoable(changeReducer)
			let INIT_STATE=createState(doc,content)

			return (state=INIT_STATE,action={})=>reducer(_reducer(state,action),action)
		},

		get name(){
			return inputTypeInstance.name
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
