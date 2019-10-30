import React from "react"
import {Representation,connect,ACTION} from "we-edit"
import {Controlled as CodeMirror} from "react-codemirror2"
import CodeMirror_Style from "!!raw-loader!codemirror/lib/codemirror.css"

import Type, {modes} from "./type"

export const themes=(ctx=>{
    const keys=ctx.keys()
    const values=keys.map(a=>ctx(a).default)
    return keys.reduce((o, k, i) => { 
        o[k.substring(2).split(".")[0]] = values[i]; 
        return o; 
    }, {});
})(require.context("!!raw-loader!codemirror/theme",false,/\.css$/));

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
export {modes, Type}

Type.install()
Plain.install()