import {ACTION as History} from "../undoable"

export const Cursor={
	ACTIVE: canvasId=>({type:"we-edit/selection/CANVAS",payload:canvasId}),
	AT: (contentId, at)=>Selection.SELECT(contentId, at),
	BACKWARD: payload=>({type:"we-edit/cursor/BACKWARD",payload}),
	FORWARD: payload=>({type:"we-edit/cursor/FORWARD",payload}),
}

export const Text={
	TYPE: payload=>({type:"we-edit/text/TYPE",payload}),
	DELETE: payload=>({type:"we-edit/text/DELETE",payload}),
	BACKSPACE:payload=>({type:"we-edit/text/BACKSPACE",payload}),
	TAB:payload=>({type:"we-edit/text/TAB",payload}),
	ENTER: payload=>({type:"we-edit/text/ENTER",payload}),
	
	CONTROL: payload=>({type:"we-edit/text/CONTROL",payload}),
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
				},
				end:{
					id:end,
					at:endAt
				}
			}
		}
	},
	START_AT:(id,at)=>({type:"we-edit/selection/STARTAT",payload:{id,at}}),
	EXTEND: payload=>({type:"we-edit/selection/EXTEND",payload}),
	
	COPY: payload=>({type:"we-edit/selection/COPY",payload}),
	PASTE: payload=>({type:"we-edit/selection/PASTE",payload}),
	CUT: payload=>({type:"we-edit/selection/CUT",payload}),
	REMOVE: (payload={})=>({type:"we-edit/text/DELETE",payload}),
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
