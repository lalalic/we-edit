export default (state, {type,payload})=>{
	switch(type){
	case `we-edit/selection/SELECTED`:
		return {...state, cursorAt:"end",...payload}
	case `we-edit/selection/CANVAS`:
		return {...state, active:payload, actived:Date.now()}
	case "we-edit/selection/STARTAT":
		return {...state, cursorAt:"start", start:payload}
	case "we-edit/selection/ENDAT":
		return {...state, cursorAt:"end", end:payload}
	case "we-edit/selection/REMOVE":
	default:
		return state
	}
}
