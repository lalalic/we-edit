import {DOMAIN} from "we-edit"
function reducer(state={loader:{},stream:{},reducer:a=>a, theme:{}},{type,payload}){
	switch(type){
        case `${DOMAIN}/office`:
            return {...state, ...payload}
        case `${DOMAIN}/office/theme`:
            return {...state, theme:{...state.theme, ...payload}}
        case `${DOMAIN}/office/reducer`:
            return {...state,reducer:payload,...payload(undefined,{type,payload:{}})}
        default:
            return state.reducer(state,arguments[1])
    }
}

export default (state,action)=>state.set("office", reducer(state.get("office"),action))
