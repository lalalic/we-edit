export default class LocalStore{
	constructor(store,key, getState){
		this.getState=()=>{
			if(getState){
				return getState(store.getState())
			}
			return store.getState()[key]
		}
		this.dispatch=action=>{
			if(typeof(action)=="object"){
				if(action.type){
					return store.dispatch({...action, type:`${key}/${action.type}`})
				}
			}
			return store.dispatch(action)
		}
		this.subscribe=store.subscribe.bind(store)
		this.replaceReducer=store.replaceReducer.bind(store)
	}

	static buildStoreKeyReducer=(key,reducer)=>({
		[key]:(state,action)=>{
			if(!state){
				return reducer(state,action)
			}else if(action.type.startsWith(`${key}/`)){
				return reducer(state,{...action, type:action.type.substring(key.length+1)})
			}else{
				return state
			}
		}
	})
}
