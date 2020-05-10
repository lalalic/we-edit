export default (state, {type,payload})=>{
	switch(type){
	case `we-edit/selection/SELECTED`:
		return {...state, cursorAt:"end",...payload}
	case `we-edit/selection/CANVAS`:
		return {...state, active:payload, actived:Date.now()}
	case "we-edit/selection/STARTAT":
		return {...state, cursorAt:"start", start:payload}
	default:
		return state
	}
}
