import React, {Component} from "react"
import base from "./base"
export default class UnitShape extends base{
    constructor({value}){
        super(...arguments)
        this.state={value}
        this.stepDown=this.stepDown.bind(this)
        this.stepUp=this.stepUp.bind(this)
    }

    UNSAFE_componentWillReceiveProps({value}){
        this.setState({value})
    }

    renderDialog(){
        return this.lineField(this.renderRibbon(false))
    }

    renderTree(){
        return this.renderRibbon()
    }
    
    renderRibbon(hinting=true){
        const {props:{min,max,step,onChange,name,label=name,types,path,required,style=this.theme.style,...props}, state:{value=""}}=this
        const hint={placeholder:label,title:label}
        return (
            <span style={{position:"relative", display:"inline-block"}}>
                <input {...{...props,...(hinting ? hint : {}),style,value,type:"text"}} 
                    onChange={e=>this.setState({value:e.target.value})}
                    onBlur={a=>this.set(this.path, value)}
                    onKeyDown={e=>{
                        if(e.keyCode==13){
                            this.set(this.path,value)
                        }
                    }}
                    />
                <svg style={{width:8,position:"absolute",right:2}} viewBox="0 0 8 24">
                    <path d="M1 8L4 4L7 8Z" stroke="black" onClick={this.stepUp}/>
                    <path d="M1 12L4 16L7 12Z" stroke="black" onClick={this.stepDown}/>
                </svg>
            </span>
        )
    }

    stepUp(){
        const {props:{step=1, min=Number.MIN_SAFE_INTEGER,max=Number.MAX_SAFE_INTEGER}, state:{value:display}}=this
        const unit=(display+"").replace(/[\d\.\+-]/g,"")
        const value=parseFloat(display)||0
        this.setState({value:Math.max(Math.min(value+step,max),min)+unit})
    }

    stepDown(){
        const {props:{step=1, min=Number.MIN_SAFE_INTEGER,max=Number.MAX_SAFE_INTEGER}, state:{value:display=""}}=this
        const unit=(display+"").replace(/[\d\.\+-]/g,"")
        const value=parseFloat(display)||0
        this.setState({value:Math.max(Math.min(value-step,max),min)+unit})
    }
}