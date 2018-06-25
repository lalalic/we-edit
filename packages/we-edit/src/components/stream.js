import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"
import extendible from "../tools/extendible"
import {Writable} from "stream"

export class Stream extends Component{
	static propTypes={
		type: PropTypes.string,
		onFinish: PropTypes.func,
	}

	static defaultProps={
		onFinish:a=>a
	}
	
	static Base=class extends Component{
		static install(config){
			Stream.install(this)
		}
		
		static uninstall(){
			Stream.uninstall(this)
		}
		
		static propTypes={
			onFinish: PropTypes.func,
			onError: PropTypes.func
		}
		
		static contextTypes={
			inRender: PropTypes.bool
		}
		
		constructor(){
			super(...arguments)
			if(this.context.inRender){
				this.doCreate()
				this.render=()=>null
			}
		}
		
		render(){
			return null
		}
		
		doCreate(){
			let stream=this.create()
			const {onFinish, onError, onReady}=this.props
			stream.on("finish",onFinish)
			stream.on("error",onError)
			onReady(stream)
			return stream
		}
		
		create(){
			throw new Error("no implementation")
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

class ConsoleStream extends Stream.Base{
	static defaultProps={
		...Stream.Base.defaultProps,
		type:""
	}
	
	create(){
		return new Writable({
			write(){
				console.log(chunk)
			}
		})
	}
}

Stream.install(ConsoleStream)
