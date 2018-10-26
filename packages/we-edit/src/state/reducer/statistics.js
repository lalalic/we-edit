export default (state={words:0,pages:0}, {type, payload})=>{
	switch(type){
		case "we-edit/statistics":
			return {...state, ...payload}
		default:
			return state
	}
}
