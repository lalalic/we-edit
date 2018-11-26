import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Anchor})=>{
    return class extends Component{
        static displayName="anchor"

        render(){
            const {x,y, ...props}=this.props
            return <Anchor
                {...props}
                xy={(line,anchor)=>({x:new (Types[x.base])(line,anchor).x(x),y:new (Types[y.base])(line,anchor).y(y)})}
                />
        }
    }
}
