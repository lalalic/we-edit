import {createStore, compose, applyMiddleware} from "redux"
import {Map} from "immutable"
import thunk from "redux-thunk"

import {text, selection} from "./reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	const INIT_STATE=Map({doc,content,mutable:{nodes:{}}})

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
