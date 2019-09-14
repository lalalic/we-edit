import TestRenderer from 'react-test-renderer'
import React, {PureComponent, Fragment, Children} from "react"
import PropTypes from "prop-types"
import {Stream} from "./components/stream"

export default function render(element){
	const promises=[]
	function inject(a){
		if(!React.isValidElement(a))
			return a

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

		if(typeof(a.props.children)!=="string"){
			return React.cloneElement(a,{},...Children.toArray(a.props.children).map(child=>inject(child)))
		}
		
		return a
	}

	let ErrorContainer=null

	const overall=new Promise((resolve,reject)=>{
		ErrorContainer=class  extends PureComponent{
			static childContextTypes={
				inRender: PropTypes.bool,
				muiTheme: PropTypes.object,
			}

			getChildContext(){
				return {
					inRender:true,
					muiTheme:{},
				}
			}

			componentDidCatch(error,info){
				reject(error)
			}
			render(){
				return <Fragment>{this.props.children}</Fragment>
			}
		}
	})


    const render=TestRenderer.create(<ErrorContainer>{inject(element)}</ErrorContainer>)

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
