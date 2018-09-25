export default (state={words:0,pages:0}, {type, payload})=>{
	switch(type){
		case "we-edit/statistics/word":
			return {...state, words: state.words+payload}
		case "we-edit/statistics/page":
			return {...state, pages: payload}
		default:
			return state
	}
}
