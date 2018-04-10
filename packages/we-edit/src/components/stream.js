import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"

const supports={}
export class Stream extends Component{
	static propTypes={
		type: PropTypes.string,
		onFinish: PropTypes.func,
	}
	
	static support(stream){
		if(!stream.support || stream.support()){
			supports[stream.type]=stream
		}
	}
	
	static get supports(){
		return {...supports}
	}

	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, onFinish=a=>a, ...props}=this.props

		const Type=supports[type]
		const jobs=[]
		let rendered=(
			<Fragment>
			{
				Children.toArray(children).map((format,key)=>{
					let stream=null
					if(Type){
						stream=new Type({...props,format:format.props.type})
					}else{
						if(type){
							console.warn(`stream[${type}] not installed, use console`)
						}else{
							console.warn(`stream not specified by type, use console`)
						}
						stream=new ConsoleStream()
					}
					jobs.push(
						new Promise((resolve,reject)=>{
							stream.on("finish",resolve)
							stream.on("error",reject)
						})
					)
					return React.cloneElement(format,{key,...props,stream})
				})
			}
			</Fragment>
		)
		
		Promise.all(jobs).then(onFinish,onFinish)
		
		return rendered
	}

	static Collection=({children,...props})=>(
		<Fragment>
			{Children.toArray(children).map((a,i)=>React.cloneElement(a,{...props,...a.props}))}
		</Fragment>
	)
}

import {Writable} from "stream"
class ConsoleStream extends Writable{
	_write(chunk){
		console.log(chunk)
	}
}
