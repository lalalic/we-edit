export default (state, {type,payload})=>{
	switch(type){
	case `we-edit/selection/SELECTED`:
		return {...state, ...payload}
	case `we-edit/selection/CANVAS`:
		return {...state, active:payload}
	default:
		return state
	}
}
