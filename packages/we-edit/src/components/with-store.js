import React, {Component, Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

export class WithStore extends Component{
	static propTypes={
		storeKey:PropTypes.string,
		getState:PropTypes.func,
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

	static contextTypes={
		store: PropTypes.object
	}

	static childContextTypes={
		store: PropTypes.object
	}

	getStore=memoize((store, storeKey, getState)=>{
		return new LocalStore(store,storeKey, getState)
	})

	getChildContext(){
		const {store}=this.context
		const {storeKey, getState}=this.props
		return {
			store:this.getStore(store, storeKey, getState)
		}
	}

	render(){
		return Children.only(this.props.children)
	}
}

export class LocalStore{
	constructor(store,key, getState){
		this.key=key
		this.getState=()=>{
			try{
				if(getState){
					return getState(store.getState())
				}
				return store.getState()[key]
			}catch(e){
				return {}
			}
		}

		this.dispatch=action=>{
			if(typeof(action)=="function"){
				return action(this.dispatch, this.getState)
			}
			return store.dispatch(action)
		}
		this.subscribe=store.subscribe.bind(store)
		this.replaceReducer=store.replaceReducer.bind(store)
	}
}
