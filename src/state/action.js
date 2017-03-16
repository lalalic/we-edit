import {getContent} from "./selector"

export const Text={
	INSERT: t=>(dispatch, getState)=>{
		const state=getState()
		const {start:{id,at},end}=state.selection
		if(id==end.id){
			let content=getContent(id)
			let text=content.getContent()
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
			let content=getContent(id)
			let text=content.getContent()
			let newText=text.substring(0,at-n)+text.substr(end.at)
			content.setState({content:newText}, e=>{
				content.reCompose()
				dispatch(Selection.SELECT(id,at-n))
			})
		}else{

		}
	}
}

