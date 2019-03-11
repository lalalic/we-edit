import {getContent, nextCursorable, nextSelectable, prevCursorable, prevSelectable, getSelection} from "../selector"
import {ACTION as History} from "../undoable"

export const Cursor={
	ACTIVE: canvasId=>({type:"we-edit/selection/CANVAS",payload:canvasId}),
	AT: (contentId, at)=>Selection.SELECT(contentId, at)
}

export const Text={
	INSERT: (t,shiftKey)=>({type:"we-edit/text/INSERT",payload:{data:t,shiftKey}}),
	REMOVE: n=>({type:"we-edit/text/REMOVE",payload:n}),
	RETURN: n=>({type:"we-edit/text/RETURN"}),
}

export const Selection={
	SELECT: function(start, at=0, end=start, endAt=at){
		endAt=arguments.length==1 ? 1 : endAt
		return {
			type:`we-edit/selection/SELECTED`,
			payload: {
				start:{
					id:start,
					at
				}
				,end:{
					id:end,
					at:endAt
				}
			}
		}
	},
	START_AT:(id,at)=>({type:"we-edit/selection/STARTAT",payload:{id,at}}),
	END_AT: (id,at)=>({type:"we-edit/selection/ENDAT",payload:{id,at}}),
	REMOVE: ()=>({type:"we-edit/selection/REMOVE"}),
	COPY: payload=>({type:"we-edit/selection/COPY",payload}),
	PASTE: payload=>({type:"we-edit/selection/PASTE",payload}),
	CUT: payload=>({type:"we-edit/selection/CUT",payload}),
	MOVE: payload=>({type:"we-edit/selection/MOVE",payload}),
	UPDATE: payload=>({type:"we-edit/selection/UPDATE", payload}),
	STYLE: payload=>({type:"we-edit/selection/STYLE",payload}),
}

export const Entity={
	CREATE: element=>({type:"we-edit/entity/CREATE", payload:element}),
	UPDATE: changing=>({type:"we-edit/entity/UPDATE", payload:changing}),
}

export const Statistics=stat=>({type:"we-edit/statistics",payload:stat})

export const Refresh=()=>({type:"we-edit/refresh"})

export const ACTION={Cursor, Text, Selection,Entity,History,Statistics, Refresh}

export default ACTION
