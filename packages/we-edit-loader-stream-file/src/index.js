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

export class Writer{
    static type="file"
	static support=support
	
    constructor(props){
        const {path,name}=resolvePathName(props)
		return createWriteStream(this.name=resolve(path,name))
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
	
	static support=support
	
	componentWillMount(){
		let {onLoad}=this.props
		const {path,name}=resolvePathName(this.props)
		readFile(resolve(path,name), (error,data)=>{
			onLoad({data,path,error,name})
		})
	}
	
	render(){
		return null
	}
}

Stream.install(Writer)
Loader.install(Reader)
