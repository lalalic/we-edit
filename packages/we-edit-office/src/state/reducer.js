import {DOMAIN} from "we-edit"
function reducer(state={loader:{},stream:{},reducer:a=>a},{type,payload}){
	switch(type){
        case `${DOMAIN}/office`:
            return {...state, ...payload}
        case `${DOMAIN}/office/reducer`:
            return {...payload(undefined,{type,payload:{}}),...state,reducer:payload}
		default:
            return state.reducer(state,arguments[1])
    }
}

export default (state,action)=>state.set("office", reducer(state.get("office"),action))
