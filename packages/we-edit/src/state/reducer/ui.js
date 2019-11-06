export default (state={selectionStyle:null,pilcrow:false}, {type,payload})=>{
	switch(type){
	case `we-edit/selection/STYLE`:
		return {...state, selectionStyle:payload}
	case `we-edit/doc/ui`:
		return {...state, ...payload}
	default:
		return state
	}
}
