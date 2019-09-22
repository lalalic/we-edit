import React from "react"
import {Representation,connect,ACTION,getContent} from "we-edit"
import PlainType from "./type"

const ViewerTypes={
    Document({children}){
        return <pre style={{textAlign:"initial"}}>{(children||"").toString()}</pre>
    }
}

const EditorTypes={
    Document: connect()(
        class Document extends React.Component{
            render(){
                const {children,dispatch}=this.props
                const value=(children||"").toString()
                return (
                    <textarea  
                    style={{textAlign:"initial",height:"100%",width:"100%",padding:10}}
                    value={value}
                    onChange={e=>dispatch(ACTION.Entity.UPDATE(e.target.value))}
                    />
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
		return <Representation {...{ViewerTypes,EditorTypes,...props,}}/>
	}
}

PlainType.install()
Plain.install()