import {createStore, compose, applyMiddleware} from "redux"
import {Map} from "immutable"
import thunk from "redux-thunk"

import {reducer as selectionReducer} from "./selection"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	const INIT_STATE=Map({doc,content})

	return createStore(function(state=INIT_STATE,action){
			state=docReducer(state, action)
			state=state.set("selection",selectionReducer(state.get("selection"),action))
			return state
		},
		composeEnhancers(applyMiddleware(thunk))
	)
}

import {Cursor, Text, Selection} from "./action"

export {Cursor} from "./cursor"
export {Selection} from "./selection"

export const ACTION={Cursor, Text, Selection}
