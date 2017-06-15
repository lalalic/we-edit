import {createStore, compose, applyMiddleware} from "redux"
import Immutable,{Map} from "immutable"
import thunk from "redux-thunk"
import {firstCursorable} from "./selector"

export function createState(doc, content, docReducer=state=>state){
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	 	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			serialize:true
		}) : compose;

	let id=firstCursorable(content)
	doc.toJSON=a=>1

	const INIT_STATE=Map({
		vendor:"we-edit",
		doc, //source file
		content, // models
		selection:Immutable.fromJS({start:{id,at:0},end:{id,at:0},cursorAt:"end"}),
		violent:{toJSON:a=>undefined}
	})

	return createStore(
		docReducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(report,thunk))
	)
}


export function isState(data){
	return data instanceof Map && data.get("vendor")=="we-edit"
}
const report=store=>next=>action=>{
	try{
		return next(action)
	}catch(error){
		console.error(error)
	}
}

export {ACTION} from "./action"
