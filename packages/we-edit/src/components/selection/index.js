import React, {PureComponent} from "react"
export default class Selection extends PureComponent{
    render(){
        const {children, ...props}=this.props
        return React.cloneElement(children,props)
    }
}
