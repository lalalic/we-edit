import React,{PureComponent, Fragment} from "react"
import PropTypes from "prop-types"

const supports={}
export class Stream extends PureComponent{
	static support(stream,name){
		supports[name]=stream
	}
	
	render(){
		const {type, children, ...props}=this.props
		const Type=supports[type]||ConsoleStream
		return (
				<Fragment>
				{children.map(
					(format,key)=>React.cloneElement(format,{key,...props,stream: new Type(props,type)})
					)
				}
				</Fragment>	
			)
	}
}

class ConsoleStream{
	constructor({},type){
		if(type){
			console.warn(`stream[${type}] not installed, use console`)
		}else{
			console.warn(`stream not specified by type, use console`)
		}
	}
	
	write(){
		console.log(...arguments)
	}
}