import React, {Component, Children} from "react"
import PropTypes from "prop-types"

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

	constructor(){
		super(...arguments)
		this.store=new LocalStore(this.context.store,this.props.storeKey, this.props.getState)
	}

	componentWillReceiveProps({storeKey,getState}){
		this.store=new LocalStore(this.context.store,storeKey, getState)
	}

	getChildContext(){
		return {store:this.store}
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
