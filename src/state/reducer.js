import {getContent} from "./selector"

export function text(state, {type,payload}){
	switch(type){
	case "text/insert":{
		let {start:{id,at},end}=state.get("selection")
		if(id==end.id){
			let content=getContent(state, id)
			let text=content.get("children")
			content=content.set("children",text.substring(0,at)+payload+text.substr(end.at))
			at+=payload.length
			return state.withMutations(state=>{
				state
					//.set("selection",{start:{id,at},end:{id,at}})
					.set("content",state.get("content").set(id,content))
			})
		}else{
			
		}
	}
	case "text/remove":{
		let {start:{id,at},end}=state.get("selection")
		if(id==end.id){
			let content=getContent(state,id)
			let text=content.get("children")
			content=content.set("children",text.substring(0,at-n)+text.substr(end.at))
			at-=n
			return state.withMutations(state=>{
				state
					.set("selection",{start:{id,at},end:{id,at}})
					.set("content",state.get("content").set(id,content))
			})
		}else{
			
		}
	}
	default:
		return state
	}
}

export function selection(state={start:{id:0,at:0},end:{id:0,at:0}}, {type,payload}){
	switch(type){
	case `selection/SELECTED`:
		return ({...state, ...payload})
	default:
		return state
	}
}