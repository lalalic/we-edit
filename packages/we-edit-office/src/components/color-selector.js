import React,{Component} from "react"

export default class ColorSelector extends Component{
    constructor(){
        super(...arguments)
        this.input=React.createRef()
    }
    render(){
        const {value, onSubmit, onRequestClose, host}=this.props
        let style={width:0,height:1,padding:0,border:0,margin:0,opacity:0}
        if(host?.uiContext=="Menu"){
            style={...style,position:"fixed",top:100,left:200}
        }
        return <input ref={this.input} type="color"  value={value}  style={style} 
            onChange={e=>{onSubmit(e.target.value);onRequestClose?.();}}
            />
    }

    componentDidMount(){
        this.input.current.click()
    }

    componentDidUpdate(){
        this.input.current.click()
    }
}