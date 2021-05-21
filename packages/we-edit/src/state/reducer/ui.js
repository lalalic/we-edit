export default (state={selectionStyle:null,pilcrow:false, scale:1, dialog:null, contextMenuAt:null}, {type,payload})=>{
	switch(type){
	case `we-edit/cursor/STYLE`:
	case `we-edit/selection/STYLE`:
		return {...state, selectionStyle:payload}
	case `we-edit/doc/ui`:{
		if(typeof(payload)=="function"){
			return payload(state)
		}
		return {...state, ...payload}
	}
	default:
		return state
	}
}
