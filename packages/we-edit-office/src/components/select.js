import React, {Component} from "react"
import Popover from "material-ui/Popover"

export default class Select extends Component{
    constructor(){
        super(...arguments)
        this.state={open:false}
    }
    render(){
        const {value, children, style}=this.props
        const {open,anchorEl}=this.state
        return (
            <div onClick={e=>this.setState({open:!open,anchorEl:e.currentTarget})} 
                style={{position:"relative",display:"inline-block",width:50,height:50,border:"1px solid lightgray",...style}}>
                {value}
                <Popover open={open} anchorEl={anchorEl}
                    onRequestClose={e=>this.setState({open:false})}>
                    {children}
                </Popover>
            </div>
        )
    }
}