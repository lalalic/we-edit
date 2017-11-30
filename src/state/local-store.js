export default class LocalStore{
	constructor(store,key){
		this.key=key
		this.store=store
	}
	
	subscribe(){
		return this.store.subscribe(...arguments)
	}
	
	replaceReducer(){
		return this.store.replaceReducer(...arguments)
	}
	
	getState(){
		this.store.getState()[key]
	}
	
	dispatch(action){
		if(typeof(action)=="object"){
			if(action.type){
				return {...action, type:`{this.key}/${action.type}`}
			}
		}
		return action
	}
}