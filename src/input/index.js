import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map,List} from "immutable"

import DOMAIN from "model"
import {createState} from "state"
import {getContent,getSelection,getFile,getParentId} from "state/selector"
import * as reducer from "state/reducer"

const supported=[]

export default {
	load(url){
		let Found=supported.find(TYPE=>TYPE.support(url))
		if(Found){
			const inst=new Found()
			return inst.load(url).then(doc=>this.build(doc,inst))
		}else{
			throw new Error(`we cannot edit this type of file`)
		}
	},
	create(type){
		let Found=supported.find(TYPE=>TYPE.support(type))
		if(Found){
			const inst=new Found()
			return inst.create(type).then(doc=>this.build(doc,inst))
		}else{
			throw new Error(`we cannot create this type of file`)
		}
	},

	support(...inputs){
		inputs.forEach(a=>supported.findIndex(a)==-1 && supported.push(a))
		return this
	},

	build(doc,self){
		let store
		return {
			render(domain){
				return self.render(doc, domain, (type, props, children)=>{
					return React.createElement(type,{...props,key:uuid()},children)
				})
			},
			Store(props){
				const createElementFactory=content=>(type, props, children, raw)=>{
					let id
					if(type.displayName=="document"){
						id="root"
						props.styles=new Map(props.styles)
					}else{
						id=self.identify(raw)
					}

					content.set(id, Immutable.fromJS({
						type:type.displayName,
						props,
						children: !Array.isArray(children) ? children : children.map(a=>a.id)
					}))

					return {id,type,props,children}
				}


				 function onChange(state,action){
					if(action.type=="@@INIT")
						return state


					let changed
					let changedContent=new Map()
						.withMutations(a=>changed=self.onChange(state,action,createElementFactory(a)))

					if(changed===false){
						return state
					}else if(typeof(changed)=="object"){
						let {selection,styles,updated}=changed
						if(selection)
							state=state.mergeIn(["selection"], selection)

						if(styles)
							state=state.setIn("content.root.props.styles".split("."),new Map(styles))

						if(updated){
							state=state.mergeIn(["content"],updated)
							state.get("violent").changing=updated
						}
					}else{
						state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))
					}
					
					if(changedContent.size!=0)
						state=state.mergeIn(["content"],changedContent)

					return state
				}

				let content=new Map()
					.withMutations(a=>self.render(doc, DOMAIN, createElementFactory(a)))

				store=createState(doc,content,onChange)

				return (
					<Provider store={store}>
						<TransformerProvider transformer={self.transform}>
							{props.children}
						</TransformerProvider>
					</Provider>
				)
			},
			save(name,option){
				return self.save(doc, name, option)
			},
			getState(){
				return store.getState()
			},
			dispatch(){
				return store.dispatch(...arguments)
			}
		}
	}
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
