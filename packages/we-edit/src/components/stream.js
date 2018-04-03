import React,{Component, Fragment, Children} from "react"
import PropTypes from "prop-types"

const supports={}
export class Stream extends Component{
	static support(stream){
		supports[stream.type]=stream
	}

	shouldComponentUpdate(){
		return false
	}

	render(){
		const {type, children, ...props}=this.props
		const Type=supports[type]
		return (
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
					return React.cloneElement(format,{key,...props,stream})
				})
			}
			</Fragment>
		)
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
