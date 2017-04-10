import {getContent} from "./selector"

export function text(state, {type,payload}){
	switch(type){
	case "text/INSERT":{
		let {start:{id,at},end}=state.get("selection")
		if(id==end.id){
			let content=getContent(state, id)
			let text=content.get("children")
			content=content.set("children",text.substring(0,at)+payload+text.substr(end.at))
			at+=payload.length
			return state.withMutations(state=>{
				state
					.set("selection",{...state.get("selection"),start:{id,at},end:{id,at}})
					.set("content",state.get("content").set(id,content))
			})
		}else{

		}
	}
	case "text/REMOVE":{
		let {start:{id,at},end}=state.get("selection")
		let n=payload
		if(id==end.id){
			let content=getContent(state,id)
			let text=content.get("children")
			content=content.set("children",text.substring(0,at-n)+text.substr(end.at))
			at-=n
			return state.withMutations(state=>{
				state
					.set("selection",{...state.get("selection"),start:{id,at},end:{id,at}})
					.set("content",state.get("content").set(id,content))
			})
		}else{

		}
	}
	default:
		return state
	}
}

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
