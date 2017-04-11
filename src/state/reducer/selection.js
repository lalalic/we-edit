export function selection(state, {type,payload}){
	switch(type){
	case `selection/SELECTED`:
		return {...state, cursorAt:"end",...payload}
	case `selection/DOC`:
		return {...state, active:payload}
	case "selection/STARTAT":
		return {...state, cursorAt:"start", start:payload}
	case "selection/ENDAT":
		return {...state, cursorAt:"end", end:payload}
	case "selection/REMOVE":
	default:
		return state
	}
}