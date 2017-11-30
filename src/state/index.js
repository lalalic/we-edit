import {createStore as createRawStore, compose, applyMiddleware} from "redux"
import Immutable,{Map} from "immutable"
import thunk from "redux-thunk"
import {firstCursorable} from "./selector"

export function createStore(INIT_STATE, reducer){
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
	let id=firstCursorable(content)
	doc.toJSON=()=>undefined

	return Map({
		vendor:"we-edit",
		doc, //source file
		content, // models
		selection:Immutable.fromJS({start:{id,at:0},end:{id,at:0},cursorAt:"end"}),
		violent:{
			toJSON:()=>undefined
		}
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
