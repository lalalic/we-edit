import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Writable} from "stream"
import {Stream, Loader} from "we-edit"

import {TextField} from "material-ui"

const support=()=>{
	try{
		return window.URL.createObjectURL && document.createElement
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
	static defaultProps={
		...Stream.Base.defaultProps,
		type:"browser",
	}
	static support=support
	
	state={
		windowFeatures:"menubar=no,location=no,resizable=yes,scrollbars=yes,status=no",
		...this.props
	}

	componentWillReceiveProps({format,fixName}){
		if(this.props.format!=format){
			this.setState({name:fixName(this.state.name)})
		}
	}

	render(){
		const {name, target, windowFeatures}=this.state
		return (
			<center>
				<div>
					<TextField
						value={name}
						floatingLabelText="file name"
						onChange={(e,name)=>this.setState({name})}/>
				</div>
				<div>
					<TextField value={target}
						floatingLabelText="target:_blank|_self|_parent|_top|frame name"
						onChange={(e,target)=>{
							if(target){
								this.setState({target,name:""})
							}else{
								this.setState({target,name:this.props.name})
							}
						}}/>
				</div>
				<div>
					<TextField value={windowFeatures}
						floatingLabelText="window features"
						onChange={(e,windowFeatures)=>{
							this.setState({windowFeatures})
						}}/>
				</div>
			</center>
		)
	}
	
	create(){
		let data=this.data=[]
		let stream=new Writable({
			write(chunk,enc, next){
				data.push(chunk)
				next()
			}
		})
		
		const {name,format,target,windowFeatures}=this.props
		stream.on("finish",()=>{
            if(target){
				this.preview(target,windowFeatures)
            }else {
               this.download(name.indexOf(".")!=-1 ? name : `${name}.${format}`)
            }
        })
		
		return stream
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
		switch(this.props.format){
		case 'svg':
			return new Blob(this.data,{type:"image/svg+xml"})
		break
		default:
			return new Blob(this.data, {type:"application/"+this.props.format})
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

