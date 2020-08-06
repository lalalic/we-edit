import React, {Component} from "react"

export default ({Container})=>class $1 extends Component{
    static displayName="inline"
    render(){
        return (<Container {...this.props} createComposed2Parent={this.createComposed2Parent}/>)
    }

    createComposed2Parent(element){
        const {x,y,children}=element.props
        return React.cloneElement(element,{x:undefined, y:undefined, children:React.cloneElement(children,{x,y})})
    }
}