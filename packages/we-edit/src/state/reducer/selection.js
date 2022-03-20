export default (state, {type,payload})=>{
	switch(type){
	case `we-edit/selection/SELECTED`:
		return {...state, ...payload}
	case `we-edit/selection/CANVAS`:
		return {...state, active:payload}
	/*
	case `we-edit/selection/ADD`:{
		const {extra=[], ...current}=state
		return {...payload, extra:[...extra,current]}
	}
	case `we-edit/selection/REMOVE`:{
		const {extra=[], ...current}=state
		return {...payload, extra:[...extra,last]}
	}
	*/
	default:
		return state
	}
}
