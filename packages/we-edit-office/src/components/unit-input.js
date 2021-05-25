import React, {Component} from "react"
export default class UnitInput extends Component{
    static getDerivedStateFromProps({value},state){
        return {value, ...state}
    }
    constructor(){
        super(...arguments)
        this.state={}
        this.stepDown=this.stepDown.bind(this)
        this.stepUp=this.stepUp.bind(this)
    }
    
    render(){
        const {props:{min,max,step,onChange=a=>a,...props}, state:{value=""}}=this
        return (
            <span style={{position:"relative", display:"inline-block"}}>
                <input {...{...props,value,type:"text"}} 
                    onChange={e=>this.setState({value:e.target.value})}
                    onBlur={a=>onChange(value)}
                    onKeyPress={e=>e.keyCode==13 && onChange(value)}
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