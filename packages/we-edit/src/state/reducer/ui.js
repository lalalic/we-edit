export default (state={selectionStyle:{props(){}}}, {type,payload})=>{
	switch(type){
	case `we-edit/selection/STYLE`:
		return {...state, selectionStyle:payload}
	default:
		return state
	}
}
