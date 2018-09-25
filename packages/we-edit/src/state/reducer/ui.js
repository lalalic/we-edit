export default (state={cursor:null,selection:null}, {type,payload})=>{
	switch(type){
	case `we-edit/selection/POSITION`:
		return {...state, ...payload}
	default:
		return state
	}
}
