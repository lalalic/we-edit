import {DOMAIN} from "we-edit"
import defaults from "lodash.defaultsdeep"
function reducer(state={loader:{},stream:{},reducer:a=>a, theme:{}},{type,payload}){
	switch(type){
        case `${DOMAIN}/office`:
            return {...state, ...payload}
        case `${DOMAIN}/office/theme`:
            return {...state, theme:defaults({}, ...[...payload, state.theme].reverse())}
        case `${DOMAIN}/office/reducer`:
            return {...payload(undefined,{type,payload:{}}),...state,reducer:payload}
		default:
            return state.reducer(state,arguments[1])
    }
}

export default (state,action)=>state.set("office", reducer(state.get("office"),action))
