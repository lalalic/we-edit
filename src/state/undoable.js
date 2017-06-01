const history={
	past:[],
	future:[]
}

export default function undoable(reducer,config){
	return function(state,action){
		history.push({action})
	}
}

export const ACTION={
	undo:a=>({type:"history/UNDO"}),
	redo:a=>({type:"history/REDO"})
}