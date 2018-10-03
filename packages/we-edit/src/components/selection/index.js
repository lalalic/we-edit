import React, {PureComponent} from "react"
export default class extends PureComponent{
    render(){
        const {children, ...props}=this.props
        return React.cloneElement(children,props)
    }
}
