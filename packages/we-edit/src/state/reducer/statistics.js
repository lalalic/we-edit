export default (state={words:0,pages:0,allComposed:false}, {type, payload})=>{
	switch(type){
		case "we-edit/statistics":{
			if(typeof(payload)=="function"){
				return payload(state)
			}
			if(payload.allComposed===false){
				return {...state, ...payload, pages:Math.max(state.pages||1, payload.pages||1)}	
			}
			return {...state, ...payload}
		}
		default:
			return state
	}
}
