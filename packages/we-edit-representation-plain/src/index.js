import React from "react"
import {Representation,connect,ACTION} from "we-edit"
import {Controlled as CodeMirror} from "react-codemirror2"
import {default as CodeMirror_Style} from "!!raw-loader!codemirror/lib/codemirror.css"

import Type from "./type"

import {themes, modes, options} from "./code-mirror-modes"

const ViewerTypes={
    Document({children}){
        return <pre style={{textAlign:"initial"}}>{(children||"").toString()}</pre>
    }
}

const EditorTypes={
    Document: ({canvas,content})=>React.cloneElement(canvas,{children:<Editor {...{value: content.getIn(["root","children"])}}/>})
}

const Editor=connect()(({theme:{font, size, ...options}, value, dispatch})=>(
    <div style={{textAlign:"initial",height:"calc(100% - 10px)",padding:5}}>
        <style>
            {CodeMirror_Style}
            {themes[options.theme]}
            {`
            .react-codemirror2,.CodeMirror{
                height:100%;
            }
            .CodeMirror{
                ${font ? `font-family:${font}!important;`:""}
                ${size ? `font-size:${size}pt!important;`:""}
            }
            `}
        </style>
        <CodeMirror
            key={`${font}(${size})`}
            value={value}
            options={options}
            onBeforeChange={(editor,data,value)=>{
                dispatch(ACTION.Entity.UPDATE(value))
            }}
            />
    </div>
))

export default class Plain extends Representation.Base{
    static displayName="plain"

	static defaultProps={
		type:"plain",
		description:"any text content"
    }

	render(){
        const {type, ...props}=this.props
        return <Representation {...{ViewerTypes,EditorTypes,...props}}/>
	}
}
export {modes, themes, Type, options}

Type.install()
Plain.install()