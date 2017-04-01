import {createStore, compose, applyMiddleware} from "redux"
import {Map} from "immutable"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	let id=content.findKey((v,k)=>v.get("type")=="text"),at=0
	const INIT_STATE=Map({
			doc, //source file
			content, // models
			composers:{}, //model instances
			selection:{start:{id,at},end:{id,at}}
			})

	return createStore(
		docReducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(thunk))
	)
}

export {ACTION} from "./action"
