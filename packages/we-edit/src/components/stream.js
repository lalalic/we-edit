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
					const {onFinish, onError, onReady}=this.props
					stream.on("finish",()=>onFinish(stream))
					stream.on("error",e=>onError(stream,e))
					onReady(stream)
					return stream
				})
		}

		create(){
			const {write=(chunk, encoding, cb)=>{
				console.debug(chunk.toString())
				process.nextTick(cb)
			}}=this.props
			return new Writable({write,autoDestroy:true})
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
