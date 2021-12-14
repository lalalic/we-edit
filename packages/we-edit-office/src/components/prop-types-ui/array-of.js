import React, {Component} from "react"
import base from "./base"
import $String from "./string"

//arrayOf(string), arrayOf(<div/>)
export default class arrayOf extends base{
    static displayName="arrayOf"
    constructor(){
        super(...arguments)
        this.state={active:0,values:[]}
    }

    static getDerivedStateFromProps({value=[]},{active}){
        return {values:value}
    }

    renderDialog(){
        const {type:{Type}, wrapper1=<option/>, collection=<select multiple={true}/>,activeFirst=true, actionStyle={}, activeStyle={}, collectionStyle={}}=this.$props
        const {active,values}=this.state
        const UIType=this.getUIType(Type.type)
        const activeEl=(
            <div key="active" style={activeStyle}>
                {React.createElement(UIType,{...Type.props,value:values[active]})}
            </div>
        )

        const collectionEl=(
            <div key="collection" style={collectionStyle}>
                {React.cloneElement(collection,{
                    value:values[active],
                    onChange:e=>{
                        debugger
                        this.setState({active:values.indexOf(e)})
                    },
                    children:values.map((a,i)=>React.cloneElement(wrapper1,{value:a,label:a,key:i,selected:i==active, onClick:a=>this.setState({active:i})}))
                })}
            </div>
        )
        return (
            <div>
                <div key="actions" style={{textAlign:"right", ...actionStyle}}>
                    <button onClick={e=>this.setState(()=>{
                        const changed=[...values]
                        changed.splice(active,0,Type.props.value)
                        this.set(this.path, changed)
                        return {active:values.length,values:changed}
                    })}>+</button>

                    <button disable={(active>-1).toString()} onClick={e=>this.setState(()=>{
                        const changed=[...values]
                        changed.splice(active,1)
                        this.set(this.path, changed)
                        return {values:changed, active:active>=changed.length ? changed.length-1 : active}
                    })}>-</button>
                </div>
                {activeFirst ? [activeEl,collectionEl] : [collectionEl, activeEl]}
            </div>
        )
    }

    renderTree(){
        return null
    }
}