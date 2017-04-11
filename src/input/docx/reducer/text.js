import {getContent,getSelection} from "state/selector"

export function text(state, {type,payload}){
	switch(type){
	case "text/INSERT":{
		let selection=getSelection(state)
		let {start:{id,at},end}=selection
		if(id==end.id){
			if(typeof(payload)=="string"){
				if(payload.indexOf("\n")==-1 && payload.indexOf("\r")==-1)
					return insertInParagraphTextWithoutSelection(state,payload,selection)
				else
					return insertCrossParagraphTextWithoutSelection(state,payload,selection)
			}else{

			}
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

function insertInParagraphTextWithoutSelection(state,inserted,selection){
	let {start:{id,at},end}=selection
	let content=getContent(state, id)
	let text=content.get("children")
	content=content.set("children",text.substring(0,at)+inserted+text.substr(end.at))
	at+=inserted.length
	return state.withMutations(state=>{
		state
			.set("selection",{...selection,start:{id,at},end:{id,at}})
			.set("content",state.get("content").set(id,content))
	})
}

function insertCrossParagraphTextWithoutSelection(state,inserted,selection){

}

function insertInParagraphTextWithinParagraphSelection(){

}

function insertInParagraphTextCrossParagraphsSelection(){

}

function removeWithoutSelection(){

}

function removeWithinParagaphSelection(){

}

function removeCrossParagraphsSelection(){

}
