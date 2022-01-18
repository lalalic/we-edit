import React from "react"
import base from "./string"

export default class UnitShape extends base{
    static displayName="UnitShape"
    static defaultProps={
        isPrimitive:true,
    }
    
    constructor({value}){
        super(...arguments)
        this.state={value: this.normalize(value)}
        this.stepDown=this.stepDown.bind(this)
        this.stepUp=this.stepUp.bind(this)
    }

    normalize(value){
        const {normalize=a=>a}=this.$props
        return normalize(value)
    }

    UNSAFE_componentWillReceiveProps({value}){
        this.setState({value:this.normalize(value)})
    }

    renderTree(){
        const {
            $props:{
                min,max,step,onChange,name,label=name,types,path,required,style=this.theme.style,
                uiContext,theme,
                defaultValue, isPrimitive,normalize,
                ...props
            }, 
            state:{value=""}
        }=this
        return (
            <span style={{position:"relative", display:"inline-block"}} className="unit-shape">
                <input {...{...props,title:label,style,value, type:"text"}} 
                    onFocus={e=>e.target.select()}
                    onChange={e=>this.setState({value:e.target.value})}
                    onBlur={a=>this.set(this.path, value)}
                    onKeyDown={e=>{
                        if(e.keyCode==13){
                            this.set(this.path,value)
                        }
                    }}
                    />
                <svg style={{width:8,position:"absolute",right:4}} viewBox="0 0 8 24">
                    <path d="M1 8L4 4L7 8Z" stroke="black" onClick={this.stepUp}/>
                    <path d="M1 12L4 16L7 12Z" stroke="black" onClick={this.stepDown}/>
                </svg>
            </span>
        )
    }

    stepUp(){
        const {$props:{step=1, min=Number.MIN_SAFE_INTEGER,max=Number.MAX_SAFE_INTEGER}, state:{value:display}}=this
        const unit=(display+"").replace(/[\d\.\+-]/g,"")
        const value=parseFloat(display)||0
        this.setState({value:Math.max(Math.min(value+step,max),min)+unit},()=>{
            this.set(this.path, this.state.value)
        })
    }

    stepDown(){
        const {$props:{step=1, min=Number.MIN_SAFE_INTEGER,max=Number.MAX_SAFE_INTEGER}, state:{value:display=""}}=this
        const unit=(display+"").replace(/[\d\.\+-]/g,"")
        const value=parseFloat(display)||0
        this.setState({value:Math.max(Math.min(value-step,max),min)+unit},()=>{
            this.set(this.path,this.state.value)
        })
    }
}