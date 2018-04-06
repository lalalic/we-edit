import "./tools/array-find-last"
import TestRenderer from 'react-test-renderer'
import React, {PureComponent} from "react"
import PropTypes from "prop-types"

export * from "./components"

export {ACTION, DOMAIN, reducer, getActive} from "./components/we-edit"
export {getContent, getSelection, getFile, getUndos, getRedos} from "./state/selector"
export {default as getClientRect} from "./tools/get-client-rect"
export {default as shallowEqual} from "./tools/shallow-equal"
export {default as uuid} from "./tools/uuid"

export {default as ContentQuery} from "./state/selector/query"
export {default as Input} from "./input"

export {editify} from "./model/edit"

export {default as models} from "./model"


export function render(element){
	let promises=[]
	class Render extends PureComponent{
		static childContextTypes={
			addAsyncJob: PropTypes.func
		}
		getChildContext(){
			return {
				addAsyncJob(p){
					promises.push(p.catch(e=>e))
				}
			}
		}
		render(){
			return element
		}
	}
    let render=TestRenderer.create(<Render/>)
	return Promise.all(promises)
		.then(()=>render.unmount())
		.catch(as=>{
			render.unmount()
			let error=as.reduce((errors,a)=>{
				if(a&&a.message){
					errors.push(a)
				}
				return errors
			},[])
			if(error.length){
				throw new Error(error.join("\r\n"));
			}
		})
}
