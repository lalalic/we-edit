import React, {Component, Fragment} from "react"
import MenuItem from "material-ui/MenuItem"
import ColorButton from "../color-button"
import Base from "./base"

export default class ColorShape extends Base{
    static displayName="ColorShape"
    static defaultProps={
        isPrimitive:true,
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

    renderDialog(){
        return this.lineField(this.renderRibbon())
    }

    renderTree(){
        const {value, style}=this.$props
        return <input type="color" value={value} onChange={e=>this.set(this.path,e.target.value)} style={style}/>
    }

    renderMenu(){
        const {name,label=name,value}=this.$props
        return (
            <Fragment>
                <MenuItem primaryText={`${label}...`} onClick={e=>this.setState({open:true})}/>
                {this.state.open && <ColorSelector value={value} onChange={v=>{this.set(this.path,v);this.context.onItemClick()}}/>}
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