import {createStore as createRawStore, compose, applyMiddleware} from "redux"
import {connect as _connect, createProvider} from "react-redux"
import Immutable,{Map} from "immutable"
import thunk from "redux-thunk"
import {firstCursorable, getSelectionStyle, getSelection} from "./selector"

export function createStore(reducer,INIT_STATE){
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	 	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			serialize:true
		}) : compose;

	return createRawStore(
		reducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(report,thunk))
	)
}

export function createState(doc, content){
	const id=firstCursorable(content)
	doc.toJSON=()=>undefined

	return Map({
		vendor:"we-edit",
		doc, //source file
		content, // models
		selection:Immutable.fromJS({start:{id,at:0},end:{id,at:0},cursorAt:"end"}),
		ui:{},
		statistics:{},
		undos:[],
		redos:[],
	})
}


export function isState(data){
	return data instanceof Map && data.get("vendor")=="we-edit"
}

const report=store=>next=>action=>{
	try{
		return next(action)
	}catch(error){
		console.error(error)
	}finally{
		//console.dir(window.action={state:store.getState().toJSON(),action})
	}
}

export {ACTION} from "./action"

export const STORE_KEY="activeDocStore"
export const Provider=createProvider(STORE_KEY)
export const connect=(stateMap, actionMap, mergeProps, options={},...args)=>{
	options.storeKey=STORE_KEY
	return _connect(stateMap, actionMap, mergeProps, options,...args)
}
export const whenSelectionChange=((props=a=>a,actionMap,mergeProps,options={},...args)=>{
	return connect(state=>{
		return props({selection:getSelectionStyle(state)},state)||{}
	},actionMap,mergeProps,options,...args)
})

export const isDocumentReady=state=>{
	const selection=getSelection(state)
	const style=getSelectionStyle(state)
	if(selection && style){
		return style.start.id==selection.start.id && 
			style.start.at==selection.start.at && 
			style.end.id==selection.end.id && 
			style.end.at==selection.end.at
	}
	return false
}
