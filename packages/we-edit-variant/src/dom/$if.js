import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Component from "./$"


export default ({Container})=>class extends Component{
    static displayName="$if"
    static propTypes={
		condition: PropTypes.string.isRequired
    }

    static defaultProps={
		condition: "true"
    }

    render(){
        const {condition, children, ...props}=this.props
        let content=children
        if(this.canAssemble){
            if(!this.meet(this.context.variantContext,condition))
                content=null
        }

        return <Container {...props} type={this.constructor.displayName}>{content}</Container>
    }

    meet=memoize((variantContext, condition)=>!!this.eval(condition))
}
