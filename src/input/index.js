import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map, Record} from "immutable"

import DOMAIN from "model"
import {createState} from "state"
import {getFile, getSelection} from "state/selector"
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
		return {
			render(domain){
				return self.render(doc, domain, (type, props, children)=>{
					return React.createElement(type,{...props,key:uuid()},children)
				})
			},
			Store(props){
				let content=new Map().withMutations(function(content){
					let factory
					self.render(doc, DOMAIN, (factory=content=>(type, props, children, raw)=>{
						let id
						if(type.displayName=="document"){
							id="root"
							props.styles=Immutable.fromJS(props.styles)
						}else{
							id=self.identify(raw)
						}

						let record={
							type:type.displayName,
							props,
							children: !Array.isArray(children) ? children : children.map(a=>a.id)
						}

						if(content.set){
							content.set(id, Immutable.fromJS(record))
						}else{
							content[id]=record
						}

						return {id,type,props,children}
					})(content), factory)
				})

				 function onChange(state,action){
					if(action.type=="@@INIT")
						return state

					if(self.onChangeEx){
						state=self.onChangeEx(state,action)
					}else{
						const doc=getFile(state)
						const selection=getSelection(state)

						let changed=self.onChange(doc, selection, action,state)
						if(changed===false){
							return state
						}else if(typeof(changed)=="object"){
							if(changed.selection)
								state=state.set("selection", {...selection, ...changed.selection})
							if(changed.content){
								let content=state.get("content")
								content=content.withMutations(content=>{
									Object.keys(changed.content)
										.forEach(id=>content.set(id,Immutable.fromJS(changed.content[id])))
								})
								state=state.set("content",content)
							}
						}
					}
					state=state.set("selection",reducer.selection(getSelection(state),action))
					return state
				}

				return (
					<Provider store={createState(doc,content,onChange)}>
						<TransformerProvider transformer={self.transform}>
							{props.children}
						</TransformerProvider>
					</Provider>
				)
			},
			save(name,option){
				return self.save(doc, name, option)
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
