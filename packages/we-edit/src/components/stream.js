import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"
import extendible from "../tools/extendible"
import {Writable} from "readable-stream"

export class Stream extends Component{
	static propTypes={
		type: PropTypes.string,
		onFinish: PropTypes.func
	}

	static defaultProps={
		onFinish:a=>a
	}

	static Base=class __$1 extends Component{
		static install(conf){
			Stream.install(this,conf)
		}

		static uninstall(){
			Stream.uninstall(this)
		}

		static propTypes={
			onFinish: PropTypes.func,
			onError: PropTypes.func,
			write: PropTypes.func,
		}

		static contextTypes={
			inRender: PropTypes.bool
		}

		constructor(){
			super(...arguments)
			if(this.context.inRender||this.props.now||typeof(document)=="undefined"){
				this.render=()=>{
					return null
				}
				this.componentDidMount=()=>{
					this.doCreate()
				}
			}
		}

		render(){
			return null
		}

		doCreate(){
			return Promise
				.resolve(this.create())
				.then(stream=>{
					stream.on("finish",()=>this.onFinish(stream))
					stream.on("error",e=>this.onError(stream,e))
					this.onReady(stream)
					return stream
				})
		}

		componentDidMount(){
			this.doCreate()
		}

		create(){
			return new Writable({write:this.write.bind(this),autoDestroy:true})
		}

		write(chunk, encoding, callback){
			if(this.props.write){
				this.props.write(...arguments)
			}else{
				console.debug(chunk.toString())
				process.nextTick(callback)
			}
		}

		onFinish(stream){
			this.props.onFinish?.(stream)
		}

		onError(stream,error){
			this.props.onError?.(...arguments)
		}

		onReady(stream){
			this.props.onReady?.(stream)
		}
	}

	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, onFinish, ...props}=this.props
		const {path,name,...formatProps}=props
		const TypedStream=this.constructor.get(type)||Stream.Base
		const jobs=[]
		const rendered=(
			<Fragment>
			{
				Children.toArray(children).map((format,key)=>{
					let onFinish1, onError1
					jobs.push(
						new Promise((resolve)=>{
							onFinish1=resolve
							onError1=resolve
						})
					)
					return React.cloneElement(format,{
						key,
						...formatProps,
						stream:(<TypedStream
							{...{...props,
								format:format.props.type,
								onFinish(stream){
									onFinish1({type,format:{...format.props},stream})
								},
								onError(stream,error){
									onError1({type,format:{...format.props},stream,error})
								}
							}}
							/>)
					})
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
