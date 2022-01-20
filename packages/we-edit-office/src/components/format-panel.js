import React, {Component} from "react"
import {Tab} from "material-ui"


export default class extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {props:{children,...props}, state:{label="Format"}}=this
        return (
            <Tab  {...props} label={label}>
                {children.map(a=>React.cloneElement(a,{changeLabel:label=>this.setState(label)}))}
            </Tab>
        )
    }
}