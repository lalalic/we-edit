import {Input} from "we-edit"
import {Readable} from "readable-stream"

export default class Plain extends Input.Editable{
    static defaultProps={
        type:"plain",
        name:"plain text",
        ext:"js,txt,log,sql,xml",
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
		return String.fromCharCode.apply(null, new Uint8Array(data))
	}
	
	render(createElement/*(TYPE, props, children, rawcontent)*/,{Document,Paragraph,Text}){
		return createElement(
			Document,
			{},
			this.doc,
			{id:"root"}
		)
	}

	onChange(state,{type,payload}){
		switch(type){
		case "we-edit/entity/UPDATE":
			return state.setIn(["content","root","children"],this.doc=payload)
		}
		return false
	}
}
