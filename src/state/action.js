import {getContent, nextCursorable, prevCursorable} from "./selector"
import {Text as TextModel} from "pagination"

export const Cursor={
	ACTIVE: docId=>({type:"selection/DOC",payload:docId})
	,AT: (contentId, at)=>Selection.SELECT(contentId, at)
	,MOVE_RIGHT: ()=>(dispatch,getState)=>{
		const state=getState()
		let {start:{id,at},end}=state.get("selection")
		let target=getContent(state,id).toJS()
		const text=target.children
		if(text.length>at+1){
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
		dispatch(Selection.SELECT(id,at))
	}
	,MOVE_LEFT: ()=>(dispatch,getState)=>{
		const state=getState()
		let {start:{id,at},end}=state.get("selection")
		if(at>0){
			at--
		}else{
			let target=prevCursorable(state,id)
			if(target){
				id=target
				let children=getContent(state, target).get("children")
				at=children.length-1
			}else{
				//keep cursor at end of current target
			}
		}
		dispatch(Selection.SELECT(id,at))
	}
	,MOVE_UP: ()=>Selection.MOVE_LEFT()
	,MOVE_DOWN: ()=>Selection.MOVE_RIGHT()
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
	})
}

export const ACTION={Cursor, Text, Selection}

export default ACTION
