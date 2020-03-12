import {DOMAIN} from "we-edit"
function reducer(state={loader:{},stream:{},channels:{}},{type,payload}){
	switch(type){
        case `${DOMAIN}/office/LOADER`:
            return {...state, loader:payload}
        case `${DOMAIN}/office/STREAM`:
            return {...state, stream:payload}
        case `${DOMAIN}/office/FORMAT`:
            return {...state, format:payload}
        case `${DOMAIN}/office/channel`:
            return {...state, channel:payload}
        case `${DOMAIN}/office/scale`:
            return {...state, scale:payload}
		default:
            return state
    }
}

export default (state,action)=>state.set("office", reducer(state.get("office"),action))
