import React, {PureComponent} from "react"
export default class __$1 extends PureComponent{
    render(){
        const {children, ...props}=this.props
        return React.cloneElement(children,props)
    }
}
