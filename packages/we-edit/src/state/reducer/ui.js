export default (state={selectionStyle:null}, {type,payload})=>{
	switch(type){
	case `we-edit/selection/STYLE`:
		return {...state, selectionStyle:payload}
	default:
		return state
	}
}
