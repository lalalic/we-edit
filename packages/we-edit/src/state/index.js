import {createStore as createRawStore, compose, applyMiddleware} from "redux"
import {connect as _connect, createProvider} from "react-redux"
import Immutable,{Map} from "immutable"
import thunk from "redux-thunk"
import {firstCursorable, getSelectionStyle, getSelection} from "./selector"
import React from "react"

export function stateSafe(o){
	return new Proxy(o,{
        get(o,k){
            if(k=="toJSON"){
                return a=>"..."
            }
            return Reflect.get(...arguments)
        }
    })
}

export function createStore(reducer,INIT_STATE){
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
			serialize:{
				replacer(key,value){
					if(React.isValidElement(value)){
						return `<A ReactElement>`
					}

					if(value?.setState && value?.render){
						return `<A React Component>`
					}
					
					return value
				}
			}
		}) || compose;

	return createRawStore(
		reducer,
		INIT_STATE,
		composeEnhancers(applyMiddleware(report,thunk))
	)
}

export function createState(doc={}, content=new Map({root:"fake document"})){
	const id=firstCursorable(content)
	
	return Map({
		vendor:"we-edit",
		doc:stateSafe(doc), //source file
		content, // models
		selection:Immutable.fromJS({start:{id,at:0},end:{id,at:0}}),
		ui:{},
		statistics:{},
		undos:[],
		redos:[]
	})
}


export function isState(data){
	return data instanceof Map && data.get("vendor")=="we-edit"
}

const report=store=>next=>action=>{
	try{
		return next(action)
	}catch(error){
		console.error(error)
	}finally{
		//console.dir(window.action={state:store.getState().toJSON(),action})
	}
}

export {ACTION} from "./action"

export const STORE_KEY="activeDocStore"
export const Provider=createProvider(STORE_KEY)
export const connect=(stateMap, actionMap, mergeProps, options={},...args)=>{
	options.storeKey=STORE_KEY
	return _connect(stateMap, actionMap, mergeProps, options,...args)
}
export const whenSelectionChange=((props=a=>a,actionMap,mergeProps,options={},...args)=>{
	return connect(state=>{
		return props({selection:getSelectionStyle(state)},state)||{}
	},actionMap,mergeProps,options,...args)
})

export const whenSelectionChangeDiscardable=((mapProps=a=>a,actionMap,mergeProps,options={},...args)=>{
	return A=>discardable({timeout:200})((
			connect((state,props)=>{
				return mapProps({...props,selection:getSelectionStyle(state)},state)||{}
			},actionMap,mergeProps,options,...args)(A))
		)
})

export const discardable=({timeout=100})=>A=>class extends A{
	static displayName=`discardable(${super.displayName})`
	setState(state){
		(this._prev=this._prev||Promise.resolve()).then(()=>{
			this.timeout && clearTimeout(this.timeout)
			this.timeout=setTimeout(()=>{
				this.animationFrame=requestAnimationFrame(timestamp=>{
					this._prev=new Promise(resolve=>super.setState(state,()=>{
						cancelAnimationFrame(this.animationFrame)
						resolve()
					}))
				})
			},timeout)
		})
	}
}

export const createEmptyStore=()=>createStore(state=>state, createState())

export const isDocumentReady=state=>{
	const selection=getSelection(state)
	const style=getSelectionStyle(state)
	if(selection && style){
		return style.start.id==selection.start.id && 
			style.start.at==selection.start.at && 
			style.end.id==selection.end.id && 
			style.end.at==selection.end.at
	}
	return false
}

