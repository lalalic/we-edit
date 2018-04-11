import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"

const supports={}
export class Stream extends Component{
	static propTypes={
		type: PropTypes.string,
		onFinish: PropTypes.func,
	}
	
	static defaultProps={
		onFinish:a=>a
	}
	
	static support(stream){
		const type=stream.type
		if(!stream.support || stream.support()){
			console.log(`stream[${type}] installed`)
			supports[type]=stream
		}else{
			console.log(`stream[${type}] discarded because of not supported environment`)
		}
	}
	
	static get supports(){
		return {...supports}
	}

	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, onFinish, ...props}=this.props
		const {path,name,...formatProps}=props
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
							stream.on("finish",()=>resolve(stream.name))
							stream.on("error",resolve)
						})
					)
					return React.cloneElement(format,{key,...formatProps,stream})
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
	static type="console"
	_write(chunk){
		console.log(chunk)
	}
}

Stream.support(ConsoleStream)
