import {createStore, compose, applyMiddleware} from "redux"
import Immutable,{Map} from "immutable"
import thunk from "redux-thunk"
import {findFirstCursorable} from "./selector"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createState(doc, content, docReducer=state=>state){
	let id=findFirstCursorable(content)

	const INIT_STATE=Map({
			doc, //source file
			content, // models
			selection:Immutable.fromJS({start:{id,at:0},end:{id,at:0},cursorAt:"end"})
			})

	return createStore(
		docReducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(thunk))
	)
}

export {ACTION} from "./action"
