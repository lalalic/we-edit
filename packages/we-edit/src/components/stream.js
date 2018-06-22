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
	
	static Base=class extends Component{
		static propTypes={
			onFinish: PropTypes.func,
			onError: PropTypes.func,
			onReady: PropTypes.func
		}
		
		componentDidMount(){
			if(!this.render()){
				Promise
					.resolve(this.create())
					.then(stream=>this.onCreated(stream))
			}
		}
		
		render(){
			return null
		}
		
		create(){
			
		}
		
		onCreated(stream){
			const {onFinish, onError, onReady}=this.props
			stream.on("finish",onFinish)
			stream.on("error",onError)
			onReady(stream)
		}
	}
	
	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, onFinish, ...props}=this.props
		const {path,name,...formatProps}=props
		const Type=this.constructor.get(type)||ConsoleStream
		const jobs=[]
		let rendered=(
			<Fragment>
			{
				Children.toArray(children).map((format,key)=>{
					let onFinish, onError
					jobs.push(
						new Promise((resolve)=>{
							onFinish=resolve
							onError=resolve
						})
					)
						
					let stream=(<Type 
								{...{...props,format:format.props.type,onFinish,onError}}
								/>)
					
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
