import React, {PureComponent} from "react"
import {Stream,Loader} from "we-edit"
import {createWriteStream, readFile} from "fs"
import path from "path"

let current=0
const counter=({format})=>`${current++}.${format}`
const support=()=>createWriteStream && readFile && path
export class Writer{
    static type="file"
	static support=support
	
    constructor({path, name=counter}){
        if(typeof(path)=="function")
			path=path(arguments[0])
		if(typeof(name)=="function")
			name=name(arguments)
		
		return createWriteStream(path.resolve(path,name))
    }
}

export class Reader extends PureComponent{
	static displayName="loader-file"
    static propTypes={
        type: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
    }

    static defaultProps={
        type:"file"
    }
	
	static contextTypes={
		addAsyncJob: PropTypes.func
	}
	
	static support=support
	
	componentWillMount(){
		const {path, onLoad}=this.props
		const {addAsyncJob=a=>a}=this.context
		readFile(path, (e,data)=>{
			addAsyncJob(new Promise((resolve,reject)=>{
				if(e){
					reject(e)
				}else{
					resolve(onLoad({data,path}))
				}
			})
		})
	}
	
	render(){
		return null
	}
}

Stream.support(Writer)
Loader.support(Reader)
