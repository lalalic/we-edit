import {getContent, nextCursorable, prevCursorable} from "./selector"
import {Text as TextModel} from "pagination"

export const Cursor={
	ACTIVE: docId=>({type:"selection/DOC",payload:docId})
	,AT: (contentId, at)=>Selection.SELECT(contentId, at)
	,MOVE_RIGHT: (bEnd)=>(dispatch,getState)=>{
		const state=getState()
		let {start,end}=state.get("selection")
		let {id,at}=bEnd ? end : start
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
		if(bEnd)
			dispatch(Selection.SELECT(start.id, start.at,id,at))
		else
			dispatch(Selection.SELECT(id,at))
	}
	,MOVE_LEFT: (bEnd)=>(dispatch,getState)=>{
		const state=getState()
		let {start,end}=state.get("selection")
		let {id,at}=bEnd ? end : start
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
		if(bEnd)
			dispatch(Selection.SELECT(start.id, start.at,id,at))
		else
			dispatch(Selection.SELECT(id,at))
	}
}

export const Text={
	INSERT: t=>({type:"text/insert",payload:t})
	,REMOVE: n=>({type:"text/remove",payload:n})
}

export const Selection={
	SELECT: (start, at, end=start, endAt=at)=>({
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
	END_AT: (id,at)=>({type:"selection/ENDAT",payload:{id,at}})
}

export const ACTION={Cursor, Text, Selection}

export default ACTION
