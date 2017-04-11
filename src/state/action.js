import {getContent, nextCursorable, prevCursorable} from "./selector"
import {Text as TextModel} from "pagination"

export const Cursor={
	ACTIVE: docId=>({type:"selection/DOC",payload:docId})
	,AT: (contentId, at)=>Selection.SELECT(contentId, at)
	,MOVE_RIGHT: (shift)=>(dispatch,getState)=>{
		const state=getState()
		let {start,end,cursorAt}=state.get("selection")
		
		if(start.id==end.id && start.at==end.at){
			let {id,at}=shift ? end : start
			let target=getContent(state,id).toJS()
			const text=target.children
			if(text.length>at){
				at++
			}else{
				target=nextCursorable(state,id)
				if(target){
					id=target
					at=0
				}else{
					//keep cursor at end of current target
				}
			}
			if(shift)
				dispatch(Selection.END_AT(id,at))
			else
				dispatch(Selection.SELECT(id,at))
		}else{
			if(shift){
				let {id,at}=cursorAt=="end" ? end : start
				let target=getContent(state,id).toJS()
				const text=target.children
				if(text.length>at){
					at++
				}else{
					target=nextCursorable(state,id)
					if(target){
						id=target
						at=0
					}else{
						//keep cursor at end of current target
					}
				}
				dispatch(Selection[`${cursorAt.toUpperCase()}_AT`](id,at))
			}else
				dispatch(Selection.SELECT(end.id,end.at))	
		}
	}
	,MOVE_LEFT: (shift)=>(dispatch,getState)=>{
		const state=getState()
		let {start,end,cursorAt}=state.get("selection")
		if(start.id==end.id && start.at==end.at){
			let {id,at}=shift ? end : start
			if(at>0){
				at--
			}else{
				let target=prevCursorable(state,id)
				if(target){
					id=target
					let children=getContent(state, target).get("children")
					at=children.length
				}else{
					//keep cursor at end of current target
				}
			}
			if(shift)
				dispatch(Selection.START_AT(id, at))
			else
				dispatch(Selection.SELECT(id,at))
		}else{
			if(shift){
				let {id,at}=cursorAt=="start" ? start : end
				if(at>0){
					at--
				}else{
					let target=prevCursorable(state,id)
					if(target){
						id=target
						let children=getContent(state, target).get("children")
						at=children.length
					}else{
						//keep cursor at end of current target
					}
				}
				dispatch(Selection[`${cursorAt.toUpperCase()}_AT`](id,at))

			}else
				dispatch(Selection.SELECT(start.id,start.at))
		}
	}
}

export const Text={
	INSERT: t=>({type:"text/INSERT",payload:t})
	,REMOVE: n=>({type:"text/REMOVE",payload:n})
}

export const Selection={
	SELECT: (start, at, end=start, endAt=at, cursorAt)=>({
		type:`selection/SELECTED`
		,payload: {
			start:{
				id:start
				,at
			}
			,end:{
				id:end
				,at:endAt
			}
		}
	}),
	START_AT:(id,at)=>({type:"selection/STARTAT",payload:{id,at}}),
	END_AT: (id,at)=>({type:"selection/ENDAT",payload:{id,at}}),
	REMOVE: ()=>({type:"selection/REMOVE"})
}

export const ACTION={Cursor, Text, Selection}

export default ACTION
