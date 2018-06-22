import {PureComponent} from "react"
import PropTypes from "prop-types"
import {Stream,Loader} from "we-edit"
import {createWriteStream, readFile} from "fs"
import {dirname, basename,resolve} from "path"

let current=0
const counter=({format})=>`${current++}.${format}`
const support=()=>createWriteStream && readFile

function resolvePathName({path,name}){
	if(typeof(path)=="function")
		path=path(arguments[0])
		
	if(!name){
		name=basename(path)
		path=dirname(path)
	}
	
	if(!name)
		name=counter
	
	if(typeof(name)=="function")
		name=name(arguments[0])
	
	return {path,name}
}

export class Writer extends Stream.Base{
    static defaultProps={
		...Stream.Base.defaultProps,
		type:"file"
	}
	
	static support=support
	
	create(){
		const {path,name}=resolvePathName(this.props)
		return createWriteStream(resolve(path,name))
	}
}

export class Reader extends Loader.Base{
	static displayName="loader-file"
    static propTypes={
		...Loader.Base.propTypes,
		path: PropTypes.string.isRequired,
    }

    static defaultProps={
		...Loader.Base.defaultProps,
        type:"file"
    }
	
	static support=support
	
	load(){
		const {path,name}=resolvePathName(this.props)
		return new Promise((resolve1,reject)=>{
			readFile(resolve(path,name), (error,data)=>{
				resolve1({data,path,error,name})
			})
		})
	}
}

Stream.install(Writer)
Loader.install(Reader)
