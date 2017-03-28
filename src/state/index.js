import {createStore, compose, applyMiddleware} from "redux"
import {Map} from "immutable"
import thunk from "redux-thunk"

import {text, selection} from "./reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	let id=content.findKey((v,k)=>v.get("type")=="text"),at=0
	const INIT_STATE=Map({doc,content,selection:{start:{id,at},end:{id,at}}})

	return createStore(function(state=INIT_STATE,action){
			state=docReducer(state, action)
			state=state.set("selection",selection(state.get("selection"),action))
			state=text(state,action)
			return state
		},
		composeEnhancers(applyMiddleware(thunk))
	)
}

export {ACTION} from "./action"

export {Cursor} from "./cursor"
export {Selection} from "./selection"
