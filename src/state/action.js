import {getContent} from "./selector"
import {Text as TextModel} from "pagination"

export const Cursor={
	AT: (contentId, from, width)=>(dispatch,getState)=>{
		const content=getContent(getState(), contentId).toJS()
		const text=content.children
		const wordwrapper=new TextModel.WordWrapper(content.props)
		const end=wordwrapper.widthString(width, text.substr(from))
		dispatch(Selection.SELECT(contentId, from+end))
	}
}

export const Text={
	INSERT: t=>(dispatch, getState)=>{
		const state=getState()
		const {start:{id,at},end}=state.selection
		if(id==end.id){
			let content=getContent(state, id)
			let text=content.children
			let newText=text.substring(0,at)+t+text.substr(end.at)
			content.setState({content:newText}, e=>{
				content.reCompose()
				dispatch(Selection.SELECT(id,at+t.length))
			})
		}else{

		}
	}
	,REMOVE: n=>(dispatch, getState)=>{
		const state=getState()
		const {start:{id,at},end}=state.selection
		if(id==end.id){
			let content=getContent(state,id)
			let text=content.children
			let newText=text.substring(0,at-n)+text.substr(end.at)
			content.setState({content:newText}, e=>{
				content.reCompose()
				dispatch(Selection.SELECT(id,at-n))
			})
		}else{

		}
	}
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
	,MOVE_RIGHT: a=>({type:`selection/MOVE_RIGHT`})
	,MOVE_LEFT: a=>({type:`selection/MOVE_LEFT`})
	,MOVE_UP: a=>({type:`selection/MOVE_UP`})
	,MOVE_DOWN: a=>({type:`selection/MOVE_DOWN`})
}

