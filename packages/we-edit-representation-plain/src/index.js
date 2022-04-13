import React from "react"
import {Representation,connect,ACTION} from "we-edit"
import {Controlled as CodeMirror} from "react-codemirror2"
import CodeMirror_Style from "codemirror/lib/codemirror.css"

import Type from "./type"

import {themes, modes} from "./code-mirror-modes"

const ViewerTypes={
    Document({children}){
        return <pre style={{textAlign:"initial"}}>{(children||"").toString()}</pre>
    }
}

const EditorTypes={
    Document: connect()(
        class Document extends React.Component{
            render(){
                const {children,dispatch,setting={theme:"material"}, mode=setting.mode}=this.props
                const value=(children||"").toString()
                const style=themes[setting.theme]
                return (
                    <div style={{textAlign:"initial",height:"calc(100% - 10px)",padding:5}}>
                        <style>
                            {CodeMirror_Style}
                            {style}
                            {`
                            .react-codemirror2,.CodeMirror{
                                height:100%;
                            }
                            .CodeMirror{
                                ${setting.font ? `font-family:${setting.font};`:""}
                                ${setting.size ? `font-size:${setting.size}pt;`:""}
                            }
                            `}
                        </style>
                        <CodeMirror
                            key={`${setting.font}(${setting.size})`}
                            value={value}

                            options={{
                                theme:setting.theme,
                                lineNumbers:setting.number,
                                mode: setting.mode||mode,
                                viewportMargin:20,
                                lineWrapping:setting.wrap
                            }}

                            onBeforeChange={(editor,data,value)=>{
                                dispatch(ACTION.Entity.UPDATE(value))
                            }}
                            />
                    </div>
                )
            }
        })
}

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
export {modes, themes, Type}

Type.install()
Plain.install()