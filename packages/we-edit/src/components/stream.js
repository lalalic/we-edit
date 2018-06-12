import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"
import extendible from "../tools/extendible"

export class Stream extends Component{
	static propTypes={
		type: PropTypes.string,
		onFinish: PropTypes.func,
	}

	static defaultProps={
		onFinish:a=>a
	}
	
	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, onFinish, ...props}=this.props
		const {path,name,...formatProps}=props
		const Type=this.constructor.get(type)
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

extendible(Stream, "output stream")

import {Writable} from "stream"
class ConsoleStream extends Writable{
	static type="console"
	_write(chunk){
		console.log(chunk)
	}
}

Stream.install(ConsoleStream)
