import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map,Collection} from "immutable"

import DOMAIN from "model"
import {createState, isState} from "state"
import {getContent,getSelection,getFile,getParentId} from "state/selector"
import * as reducer from "state/reducer"

import {History} from "state/undoable"

const supported=[]

export default {
	load(url){
		let Found=supported.find(TYPE=>TYPE.support(url))
		if(Found){
			const inst=new Found()
			return inst.load(url).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit this type of file`)
		}
	},
	create(type){
		let Found=supported.find(TYPE=>TYPE.support(type))
		if(Found){
			const inst=new Found()
			return inst.create(type).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot create this type of file`)
		}
	},

	support(...inputs){
		inputs.forEach(a=>supported.findIndex(a)==-1 && supported.push(a))
		return this
	}
}

function buildEditableDoc(doc,inputTypeInstance){
	let store,history
	return {
		render(domain){
			return inputTypeInstance.render(doc, domain, (type, props, children)=>{
				return React.createElement(type,{...props,key:uuid()},children)
			})
		},
		Store(props){
			let createElementFactory=createElementFactoryBuilder(inputTypeInstance)
			let changeReducer=changeReducerBuilder(createElementFactory,inputTypeInstance)
			let content=new Map().withMutations(a=>inputTypeInstance.render(doc, DOMAIN, createElementFactory(a)))

			history=new History()
			
			store=createState(doc,content,history.undoable(changeReducer))

			return (
				<Provider store={store}>
					<TransformerProvider transformer={inputTypeInstance.transform}>
						{props.children}
					</TransformerProvider>
				</Provider>
			)
		},
		save(name,option){
			return inputTypeInstance.save(doc, name, option)
		},
		getState(){
			return store.getState()
		},
		dispatch(){
			return store.dispatch(...arguments)
		},
		history(){
			return {
				canUndo(){
					return history.past.length>0
				},
				canRedo(){
					return history.future.length>0
				}
			}
		}
	}
}
/*
the builder to create reducer
*/
const changeReducerBuilder=(createElementFactory,inputTypeInstance)=>
	(state,action,historyEntry)=>{
	if(action.type=="@@INIT")
		return state

	let changed
	let changedContent=new Map()
		.withMutations(a=>{
			changed=inputTypeInstance.onChange(state,action,createElementFactory(a))
		})

	if(changed===false){
		return state
	}else if(isState(changed)){
		state=changed
	}else if(typeof(changed)=="object"){
		let {selection,styles,updated,undoables,content}=changed
		
		if(selection)
			state=state.mergeIn(["selection"], selection)

		if(undoables)
			historyEntry.changed=undoables
		
		if(updated){
			Object.keys(updated).forEach(k=>{
				let children
				if(!!(children=updated[k].children)){
						//reset parent of children
					changedContent=changedContent.withMutations(changed=>
						children.forEach(c=>{
							if(changed.has(c)){
								if(!changed.hasIn([c,"parent"])){
									changed.setIn([c,"parent"],k)
								}
							}
						})
					)
				}else{
					if(changedContent.has(k) && !changedContent.hasIn([k,"parent"])){
						//use old parent
						changedContent=changedContent.setIn([k,"parent"],state.getIn(["content",k,"parent"]))
					}
				}
			})
			state.get("violent").changing=updated
		}
		
		state=state.set("content",content) 
		
		if(styles)
			state=state.setIn("content.root.props.styles".split("."),new Map(styles))
	}else{
		state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))
	}

	state=state.mergeIn(["content"],changedContent)
	return state
}
/*
the builder to create a factory function
the factory function is to build content state as map and tree
node prototype: {type:string,props:{},children:[...id],parent:string}
*/
const createElementFactoryBuilder=inputTypeInstance=>content=>(type, props, children, raw)=>{
	let id
	if(type.displayName=="document"){
		id="root"
		props.styles=new Map(props.styles)
	}else{
		id=inputTypeInstance.makeId(raw)
	}

	content.set(id, Immutable.fromJS({
		type:type.displayName,
		id,
		props,
		children: !Array.isArray(children) ? children : children.map(a=>a.id)
	}))

	if(Array.isArray(children)){
		//set parent make map as a double direction tree structure
		children.forEach(k=>content.mergeIn([k.id],{parent:id}))
	}

	return {id,type,props,children}
}



import Input from "state/cursor/input"
class TransformerProvider extends Component{
	static propTypes={
		transformer: PropTypes.func.isRequired
	}

	static childContextTypes={
		transformer: PropTypes.func,
		getCursorInput: PropTypes.func
	}

	getChildContext(){
		const self=this
		return {
			transformer:this.props.transformer,
			getCursorInput(){
				return self.refs.input
			}
		}
	}

	render(){
		return (
			<div>
				<Input ref="input"/>
				{this.props.children}
			</div>
		)
	}
}
