import React, {Component, Fragment} from "react"
import {MenuItem} from "../menu"
import ColorButton from "../color-button"
import Base from "./string"

export default class ColorShape extends Base{
    static displayName="ColorShape"
    static defaultProps={
        isPrimitive:true,
        type:"color"
    }
    
    constructor(){
        super(...arguments)
        this.state={open:false}
    }

    renderRibbon(){
        const {name,label=name, value}=this.$props
        return (
            <ColorButton label={label} value={value} 
                onChange={v=>this.set(this.path, v)}>
                <ColorSelector/>
            </ColorButton>
        )
    }

    renderMenu(){
        const {name,label=name,value}=this.$props
        return (
            <Fragment>
                <MenuItem primaryText={`${label}...`} onClick={e=>this.setState({open:true})}/>
                {this.state.open && <ColorSelector value={value} onChange={v=>{this.set(this.path,v)}}/>}
            </Fragment>
        )
    }
}

class ColorSelector extends Component{
    constructor(){
        super(...arguments)
        this.input=React.createRef()
    }
    render(){
        const {value, onChange}=this.props
        return <input ref={this.input} type="color" 
            value={value} 
            style={{width:0,height:1,padding:0,border:0,margin:0}} 
            onChange={e=>onChange(e.target.value)}
            />
    }

    componentDidMount(){
        this.input.current.click()
    }
}