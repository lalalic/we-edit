import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Writable} from "stream"
import {Stream, Loader} from "we-edit"

import Setting from "./setting"
const support=()=>{
	try{
		window.URL.createObjectURL && document.createElement
		return true
	}catch(e){
		return false
	}
}
/**
* options:
* name: only for download
* target: show on iframe/window
*/
export class Writer extends Stream.Base{
    static type="browser"
	static SettingUI=Setting
	static support=support
    constructor({name, target,format,windowFeatures}){
        super({})
		this.format=format
		this.data=[]
		this.name="[browser]"
        this.on("finish",()=>{
            if(name){
                this.download(name.indexOf(".")!=-1 ? name : `${name}.${format}`)
            }else {
                this.preview(target,windowFeatures)
            }
        })
    }
	
	_write(chunk, enc, next){
		this.data.push(chunk)
		next()
	}

    download(name){
        let url = window.URL.createObjectURL(this.blob)
        let link = document.createElement("a");
        document.body.appendChild(link)
        link.download = name
        link.href = url;
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    preview(target,windowFeatures){
		let src=window.URL.createObjectURL(this.blob)
		if(windowFeatures){
			let winPreview=window.open(src,target||"we-edit-previewer",windowFeatures)
			winPreview.addEventListener("beforeunload",()=>window.URL.revokeObjectURL(src))
		}else{
			let a=document.createElement("a")
			let body=document.querySelector('body')
			a.href=src
			a.target=target||"we-edit-previewer"
			body.appendChild(a)
			a.click()
			body.removeChild(a)
		}
    }
	
	get blob(){
		switch(this.format){
		case 'svg':
			return new Blob(this.data,{type:"image/svg+xml"})
		break
		default:
			return new Blob(this.data, {type:"application/"+this.format})
		}
	}
}

export class Reader extends Loader.Base{
    static displayName="loader-browser"

    static defaultProps={
		...Loader.Base.defaultProps,
        type:"browser"
    }
	
	static support=support

    render(){
        return <input ref="input"
            type="file"
            onChange={({target})=>{
				let file=target.files[0]
                let reader=new FileReader()
				reader.onload=e=>{
					this.props.onLoad({
						data:e.target.result,
						mimeType:file.type,
						name:file.name
					})
				}
				reader.readAsArrayBuffer(file)
				target.value=""
            }}
            style={{position:"fixed", left:-9999}}/>
    }

    componentDidMount(){
        this.refs.input.click()
    }
}

Loader.install(Reader)
Stream.install(Writer)

