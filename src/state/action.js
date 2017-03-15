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

export const Selection={
    ACTION:{
    	SELECT: (start, at, end=start, endAt=at)=>({
    		type:`selection/selected`
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
    },
    REDUCER(state=INIT_STATE, {type,payload}){
        switch(type){
    	case `${DOMAIN}/selected`:
    		return ({...state, ...payload})
    	case `${DOMAIN}/MOVE_DOWN`:
    	case `${DOMAIN}/MOVE_RIGHT`:{
    			let {start:{id,at},end}=state
    			let target=getContent(id)
    			const text=target.getContent()
    			if(text.length>at+1){
    				at++
    			}else{
    				target=getNextTextOf(id)
    				if(target){
    					id=target.id
    					at=0
    				}else{
    					//keep cursor at end of current target
    				}
    			}
    			return {start:{id,at}, end:{id,at}}
    		}
    	case `${DOMAIN}/MOVE_UP`:
    	case `${DOMAIN}/MOVE_LEFT`:{
    			let {start:{id,at},end}=state
    			if(at>0){
    				at--
    			}else{
    				let target=getPrevTextOf(id)
    				if(target){
    					id=target.id
    					at=target.getContent().length-1
    				}else{
    					//keep cursor at end of current target
    				}
    			}
    			return {start:{id,at}, end:{id,at}}
    		}
    	}
    	return state
    }
}


const INIT_STATE={
	start:{
		id:0
		,at:0
	}
	,end:{
		id:0
		,at:0
	}
}
export const reducer=(state=INIT_STATE, {type,payload})=>{
	switch(type){
	case `${DOMAIN}/selected`:
		return ({...state, ...payload})
	case `${DOMAIN}/MOVE_DOWN`:
	case `${DOMAIN}/MOVE_RIGHT`:{
			let {start:{id,at},end}=state
			let target=getContent(id)
			const text=target.getContent()
			if(text.length>at+1){
				at++
			}else{
				target=getNextTextOf(id)
				if(target){
					id=target.id
					at=0
				}else{
					//keep cursor at end of current target
				}
			}
			return {start:{id,at}, end:{id,at}}
		}
	case `${DOMAIN}/MOVE_UP`:
	case `${DOMAIN}/MOVE_LEFT`:{
			let {start:{id,at},end}=state
			if(at>0){
				at--
			}else{
				let target=getPrevTextOf(id)
				if(target){
					id=target.id
					at=target.getContent().length-1
				}else{
					//keep cursor at end of current target
				}
			}
			return {start:{id,at}, end:{id,at}}
		}
	}
	return state
}
