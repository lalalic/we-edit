import TestRenderer from 'react-test-renderer'
import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {Stream} from "./components/stream"

export default function render(element){
	let promises=[]
	function inject(a){
		if(a.type==Stream){
			let onFinish=a.props.onFinish
			let _onFinish
			
			promises.push(new Promise((resolve,reject)=>{
				_onFinish=function(e){
					try{
						onFinish(...arguments)
					}finally{
						resolve(...arguments)
					}
				}
			}))
			a=React.cloneElement(a,{onFinish:_onFinish})
		}
		
		let children=Children.toArray(a.props.children)
		return React.cloneElement(a,{},...children.map(child=>inject(child)))
	}
	
	let ErrorContainer=null
	
	let overall=new Promise((resolve,reject)=>{
		ErrorContainer=class  extends PureComponent{
			static childContextTypes={
				inRender: PropTypes.bool
			}
			
			getChildContext(){
				return {
					inRender:true
				}
			}
			
			componentDidCatch(error,info){
				console.debug(error)
				reject(error)
			}
			render(){
				return Children.only(this.props.children)
			}
		}
	})
	
	
    let render=TestRenderer.create(<ErrorContainer>{inject(element)}</ErrorContainer>)
	
	return new Promise((resolve,reject)=>{
		overall
			.catch(e=>{
				render.unmount()
				reject([e])
			})

		Promise.all(promises)
			.then(results=>{
				render.unmount()
				
				results=results.reduce((flat,a)=>[...flat,...a],[])
					.filter(a=>!!a)
					
				let errors=results.filter(a=>a instanceof Error)
				if(errors.length){
					reject(errors,results.filter(a=>!(a instanceof Error)))
				}else{
					resolve(results)
				}
			})
	})
}