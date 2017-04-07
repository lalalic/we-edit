import {createStore, compose, applyMiddleware} from "redux"
import {Map} from "immutable"
import thunk from "redux-thunk"
import {findFirstCursorable} from "./selector"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	let id=findFirstCursorable(content)
	
	const INIT_STATE=Map({
			doc, //source file
			content, // models
			selection:{start:{id,at:0},end:{id,at:0}}
			})

	return createStore(
		docReducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(thunk))
	)
}

export {ACTION} from "./action"
