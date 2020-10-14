import {Input} from "we-edit"
import {Readable} from "readable-stream"

export const modes=(ctx=>{
	ctx.keys().forEach(ctx)
	const codemirror=require("codemirror")
	return codemirror.modeInfo
})(require.context("codemirror/mode",true,/\.js$/))

export default class Plain extends Input.Editable{
    static defaultProps={
        type:"plain",
        name:"plain text",
        ext:modes.map(a=>a.ext).filter(a=>!!a).flat().join(","),
        mimeType:"text/plain"
    }

    static support=function support(file){
        if(arguments.length===0){//for installer
            return true
		}
		
        return true
    }

	stream(){
		const stream=new Readable({objectMode:true})
		stream.push(this.doc)
		return stream
	}

	parse({data,...props}){
		this.props=props
		const mode=modes.find(({mime,ext=[]})=>props.ext && ext.includes(props.ext) || props.mimeType===mime)
		if(mode && mode.mode!=="null"){
			this.mode=mode.mode
		}
		
		if(typeof(data)=="string")
			return data
		return String.fromCharCode.apply(null, new Uint8Array(data))
	}
	
	render(createElement/*(TYPE, props, children, rawcontent)*/,{Document,Paragraph,Text}){
		return createElement(
			Document,
			{mode:this.mode},
			this.doc,
			{}
		)
	}

	makeId(){
		return 'root'
	}

	onChange(state,{type,payload}){
		switch(type){
		case "we-edit/entity/UPDATE":
			return state.setIn(["content","root","children"],this.doc=payload)
		}
		return false
	}
}
