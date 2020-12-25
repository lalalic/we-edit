import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

export default class Interseptor extends Component{
    static displayName="interseptor-cache-lastcomposed-based-on-hash"
    static contextTypes={
        parent: PropTypes.object,
    }

    static childContextTypes={
        parent: PropTypes.object,
    }

    constructor(){
        super(...arguments)
        this.lastComposed=[]
        this.parent=new Proxy(this.context.parent,{
            get:(parent, k, proxy)=>k=="appendComposed" ? this.appendComposed.bind(this) : Reflect.get(parent,k,proxy)
        })
    }

    getChildContext(){
        return {
            parent:this.parent,
        }
    }

    appendComposed(a){
        this.context.parent.appendComposed(a)
        this.lastComposed.push(a)
    }

    shouldComponentUpdate({hash}){
        if(hash!==this.props.hash){
            this.lastComposed=[]
            return true
        }else{
            this.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
            return false
        }
    }

    render(){
        return <Fragment>{this.props.children}</Fragment>
    }
}