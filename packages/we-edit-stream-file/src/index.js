import {Writable} from "stream"
import {Stream} from "we-edit"
import {createWriteStream} from "fs"
import path from "path"

const current=0
const counter=({format})=>`${current++}.${format}`

/**
* options:
* name: 
* path: 
*/
export default class File{
    static type="browser"
    constructor({path, name=counter}){
        super({})
		
		if(typeof(path)=="function")
			path=path(arguments[0])
		if(typeof(name)=="function")
			name=name(arguments)
		
		return createWriteStream(path.resolve(path,name))
    }
}

Stream.support(File)
